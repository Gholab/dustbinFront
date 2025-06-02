import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerEmitter = new NativeEventEmitter();

type ConnectButtonProps = {
  onConnectedChange?: (connected: boolean) => void;
  setBatteryLevel?: (value: number) => void;
  setFillLevel?: (value: number) => void;
};

export default function ConnectButton({
  onConnectedChange,
  setBatteryLevel,
  setFillLevel,
}: ConnectButtonProps) {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [measurementServiceUUID, setMeasurementServiceUUID] = useState<string[]| undefined | null>(null);
  const didConnect = useRef(false); // ✅ Pour bloquer la détection multiple

  useEffect(() => {
    BleManager.start({ showAlert: false });
    console.log('🔌 Bluetooth Manager started');

    // ✅ Détection de périphérique BLE
    BleManager.onDiscoverPeripheral((peripheral: any) => {
      if (
        peripheral.name === "SmartTrash_Simple" &&
        !didConnect.current
      ) {
        didConnect.current = true; // bloquer les doublons
        console.log('📡 Found:', peripheral);

        setIsScanning(false);

        BleManager.connect(peripheral.id).then(() => {
          console.log('✅ Connected to', peripheral.name);
          setDevice(peripheral);
          setConnected(true);
          onConnectedChange?.(true);
          retrieveDeviceInfo(peripheral);
          Alert.alert('Connection', peripheral?.name +' connected!');
        })
        .catch((err) => {
          console.error('❌ Connection error:', err);
          Alert.alert('Error', 'Failed to connect to the SmartBin.');
          didConnect.current = false;
        });
      }
    });

    BleManager.onStopScan(() => {
      console.log('✅ Scan stopped');
      setIsScanning(false);
      if (!didConnect.current) {
        Alert.alert('No device found', 'No SmartBin detected.');
      }
      didConnect.current = false; 
    });
  }, []);

  // ✅ Permissions Android BLE
  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const allGranted = Object.values(granted).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED
      );

      if (!allGranted) {
        Alert.alert(
          'Permissions requises',
          'Bluetooth + localisation doivent être autorisés.'
        );
        return false;
      }
    }

    return true;
  };

  // ✅ Scan
  const connectToSmartBin = async () => {
    const ok = await requestPermissions();
    if (!ok || isScanning) return;

    console.log('🔍 Starting scan...');
    setIsScanning(true);
    BleManager.scan([], 5, false)
      .then(() => console.log('✅ BLE scan launched'))
      .catch((err) => console.error('❌ BLE scan failed:', err));
  };

  // ✅ Déconnexion simple
  const disconnectFromSmartBin = async () => {
    if (device) {
      console.log(`Disconnecting from ${device.name}`);
      Alert.alert('Disconnection', device.name + ' disconnected!');

      setDevice(null);
    }
    setConnected(false);
    onConnectedChange?.(false);
  };

  // ✅ Simulation d'envoi de données
  const sendFakeMeasurement = (discoveredDevice: any, measurement: String) => {
    console.log(`📤 Sending fake measurement to ${discoveredDevice}`);
    const raw = measurement + ", 45";
    // 🧩 Découpe sur les virgules + supprime les espaces
    let [fillLvl, batteryLvl] = raw.split(",").map(s => parseInt(s.trim(), 10));
    
    if (isNaN(batteryLvl) || isNaN(fillLvl)) {
      console.error('❌ Invalid measurement data:', raw);
      return;
    }
    fillLvl = Math.min(Math.max(fillLvl, 0), 30); // Clamp between 0 and 25
    fillLvl = (30 - fillLvl)/30 * 100; // Convert to percentage
    fetch('http://172.16.0.85:3000/measurements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device_id: 'bin01',
        battery: batteryLvl,
        fill_level: fillLvl,
        timestamp: new Date().toISOString(),
      }),
    });
    console.log(`📤 Measurement sent: Device ID: bin01, Battery: ${batteryLvl}, Fill Level: ${fillLvl}`);
    
    setBatteryLevel?.(batteryLvl);
    setFillLevel?.(fillLvl);    
  };

  const retrieveDeviceInfo = async (peripheral: any) => {
    try {
      const servicesInfo = await BleManager.retrieveServices(peripheral.id);
      console.log("📋 All services and characteristics:", servicesInfo);
      setMeasurementServiceUUID(servicesInfo.advertising?.serviceUUIDs);
      
      let measurement = "";
      for (const c of servicesInfo.characteristics) {
        if (c.properties.Read) {
          try {
            const value = await BleManager.read(peripheral.id, c.service, c.characteristic);

            let decodedValue;
            try {
              decodedValue = String.fromCharCode(...value);
            } catch {
              decodedValue = value; // fallback brut si binaire
            }

            console.log(servicesInfo.advertising?.serviceUUIDs);
            
            if (c.service == servicesInfo.advertising?.serviceUUIDs?.toString()) {
              console.log(`📏 Measurement characteristic found in service ${c.service}:`, c.characteristic);              
              measurement = decodedValue.toString();
            }

            console.log(`✅ [Service ${c.service}] Characteristic ${c.characteristic}:`, decodedValue);
          } catch (error) {
            console.log(`❌ Failed to read characteristic ${c.characteristic} of service ${c.service}:`, error);
          }
        } else {
          console.log(`⏩ [Service ${c.service}] Characteristic ${c.characteristic} is not readable.`);
        }
      }

      console.log(`📊 Measurement from ${peripheral.name}:`, measurement);
      
      sendFakeMeasurement(peripheral, measurement); // ✅ utilise le bon périphérique

    } catch (error) {
      console.error('❌ Error retrieving device info:', error);
    }

  }

  const handlePress = async () => {
    try {
      if (connected) {
        await disconnectFromSmartBin();
      } else {
        await connectToSmartBin();
      }
    } catch (e) {
      Alert.alert('Error', 'Bluetooth connection failed.');
      console.error(e);
    }
  };

  const dustBinActions = (actionNumber: number) => {
    console.log(`🔧 Executing action ${actionNumber} on SmartBin`);
    BleManager.write(device.id, "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400003-b5a3-f393-e0a9-e50e24dcca9e", Array.from(actionNumber.toString()).map(c => c.charCodeAt(0)))
  }

  return (
    <View style={styles.container}>
      <Button
        title={connected ? 'Disconnect from SmartBin' : 'Connect to SmartBin'}
        onPress={handlePress}
        color={connected ? '#4CAF50' : '#00796B'}
      />
  
    {connected && (
      <>
        <View style={styles.spacer} />
        <Button  title="Reset state" onPress={() => dustBinActions(0)} disabled={!connected} />
    
        <View style={styles.spacer} />
        <Button title="Call dustbin" onPress={() => dustBinActions(1)} disabled={!connected} />
    
        <View style={styles.spacer} />
        <Button title="Opening" onPress={() => dustBinActions(2)} disabled={!connected} />
    
        <View style={styles.spacer} />
        <Button title="Close" onPress={() => dustBinActions(3)} disabled={!connected} />
      </>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch', // pour que les boutons prennent toute la largeur
    gap: 1, // si tu utilises React Native >= 0.71
  },
  spacer: {
    height: 8, // ou plus selon besoin
  },
});
