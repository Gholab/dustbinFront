import React, { useEffect, useRef, useState } from 'react';
import {Buffer} from 'buffer';
import {
  Alert,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  NativeModules
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);
const MEAS_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const MEAS_CHAR_RX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // NOTIFY



type ConnectButtonProps = {
  onConnectedChange?: (connected: boolean) => void;
  setBatteryLevel?: (value: number) => void;
  setFillLevel?: (value: number) => void;
  setDeviceConnected?: (device: any) => void;
};

export default function ConnectButton({
  onConnectedChange,
  setBatteryLevel,
  setFillLevel,
  setDeviceConnected,
}: ConnectButtonProps) {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [measurementServiceUUID, setMeasurementServiceUUID] = useState<string[]| undefined | null>(null);
  const didConnect = useRef(false); // ✅ Pour bloquer la détection multiple
  const notifSub = useRef<ReturnType<typeof BleManagerEmitter.addListener> | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

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
        console.log("peripheral.id", peripheral.id);
        BleManager.connect(peripheral.id).then(async () => {
          console.log('✅ Connected to', peripheral.name);
          setDevice(peripheral);
          setConnected(true);
          setDeviceConnected?.(peripheral);
          onConnectedChange?.(true);
          await BleManager.retrieveServices(peripheral.id);
          pollRef.current = setInterval(async () => {
            try {
              const bytes: number[] = await BleManager.read(peripheral.id, MEAS_SERVICE, MEAS_CHAR_RX);
              const str = Buffer.from(bytes).toString('ascii');
              console.log('♻️  FILL FROM DEVICE:', str);
              sendMeasurement(peripheral.id, str); // si tu veux garder ton POST + setFillLevel
            } catch (e) {
              console.error('❌ Error reading measurement:', e);
            }
          }, 1000);

          console.log('⏱️  Polling started @ 300ms');

          console.log('🔔 Notifications started');
          // retrieveDeviceInfo(peripheral);
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

    return () => {
      notifSub.current?.remove?.();
      notifSub.current = null;
      if (device) {
        BleManager.disconnect(device.id).catch(() => {});
      }
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null
        console.log('⏹️  Polling stopped');
      }
    };
  }, []);

  // ✅ Permissions Android BLE
  const requestPermissions = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    if (Platform.Version >= 31) {
      await BleManager.enableBluetooth().catch(() => {});
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const allGranted = Object.values(granted).every(
        r => r === PermissionsAndroid.RESULTS.GRANTED
      );
      return allGranted;
    } else {
      const loc = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (loc !== PermissionsAndroid.RESULTS.GRANTED) return false;

      await BleManager.enableBluetooth().catch(() => {});
      return true;
    }
  } catch (e) {
    console.warn('requestPermissions error', e);
    return false;
  }
};

  // ✅ Scan
  const connectToSmartBin = async () => {
    console.log("connectToSmartBin called");
    const ok = await requestPermissions();
    console.log("Permissions granted:", ok);
    if (!ok || isScanning) return;

    console.log('🔍 Starting scan...');
    setIsScanning(true);
    BleManager.scan([], 5, false)
      .then(() => console.log('✅ BLE scan launched'))
      .catch((err) => console.error('❌ BLE scan failed:', err));
  };

  // ✅ Déconnexion simple
  const disconnectFromSmartBin = async () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
      console.log('⏹️  Polling stopped');
    }
    if (device) {
      try {
        await BleManager.disconnect(device.id);
      } catch (_) {}

      console.log(`Disconnecting from ${device.name}`);
      Alert.alert('Disconnection', device.name + ' disconnected!');

      setDevice(null);
    }
    setConnected(false);
    onConnectedChange?.(false);
  };

  const sendMeasurement = (discoveredDevice: any, measurement: String) => {
    console.log(`📤 Sending measurement to ${discoveredDevice}`);
    const raw = measurement + ", 45"; // fake battery level for testing
    // 🧩 Découpe sur les virgules + supprime les espaces
    let [fillLvl, batteryLvl] = raw.split(",").map(s => parseInt(s.trim(), 10));
    
    if (isNaN(batteryLvl) || isNaN(fillLvl)) {
      //console.error('❌ Invalid measurement data:', raw);
      return;
    }
    fillLvl = Math.min(Math.max(fillLvl, 0), 22); // Clamp between 0 and 22
    fillLvl = Math.floor((22 - fillLvl)/22 * 100); // Convert to percentage
    fetch('http://backendsmartbin-production.up.railway.app/measurements', {
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
      
      sendMeasurement(peripheral, measurement); // ✅ utilise le bon périphérique

    } catch (error) {
      console.error('❌ Error retrieving device info:', error);
    }

  }

  const handlePress = async () => {
    console.log('🔘 Button pressed, toggling connection...');
    try {
      if (connected) {
        console.log('🔌 Disconnecting from SmartBin...');
        await disconnectFromSmartBin();
      } else {
        console.log('🔌 Connecting to SmartBin...');
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
      <TouchableOpacity onPress={handlePress} >
        <Text style={[styles.txtButtons,  { backgroundColor: connected ? '#c94b4b' : '#4CAF50'}]}>
          {connected ? 'Disconnect from SmartBin' : 'Connect to SmartBin'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export const actionsOnDustbin = (actionNumber: number, device: any) => {
  console.log(`🔧 Executing action ${actionNumber} on device ${device.name}`);
  BleManager.write(device.id, "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400003-b5a3-f393-e0a9-e50e24dcca9e", Array.from(actionNumber.toString()).map(c => c.charCodeAt(0)));
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch', // pour que les boutons prennent toute la largeur
    gap: 1, // si tu utilises React Native >= 0.71
  },
  spacer: {
    height: 8, // ou plus selon besoin
  },
  txtButtons: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    color: '#fff',
    borderRadius: 18, // Pour arrondir les coins
  },
});

