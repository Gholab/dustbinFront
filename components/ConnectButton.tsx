import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerEmitter = new NativeEventEmitter();

type ConnectButtonProps = {
  onConnectedChange?: (connected: boolean) => void;
};

export default function ConnectButton({ onConnectedChange }: ConnectButtonProps) {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [fillLevel, setFillLevel] = useState(12);
  const didConnect = useRef(false); // ✅ Pour bloquer la détection multiple

  useEffect(() => {
    BleManager.start({ showAlert: false });
    console.log('🔌 Bluetooth Manager started');

    // ✅ Détection de périphérique BLE
    BleManager.onDiscoverPeripheral((peripheral: any) => {
      if (
        peripheral.name === "Z Flip5 de Hajar" &&
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
          sendFakeMeasurement(peripheral); // ✅ utilise le bon périphérique
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
  const sendFakeMeasurement = (discoveredDevice: any) => {
    console.log(`📤 Sending fake measurement to ${discoveredDevice}`);
    
    fetch('http://172.16.0.85:3000/measurements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device_id: 'bin01',
        battery: batteryLevel,
        fill_level: fillLevel,
        timestamp: new Date().toISOString(),
      }),
    });
    setBatteryLevel(prev => prev - 3);
    setFillLevel(prev => prev + 2);
    Alert.alert('Connection', discoveredDevice?.name +' connected!');
  };

  const retrieveDeviceInfo = async (peripheral: any) => {
    try {
      const servicesInfo = await BleManager.retrieveServices(peripheral.id);
      console.log("📋 All services and characteristics:", servicesInfo);

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

            console.log(`✅ [Service ${c.service}] Characteristic ${c.characteristic}:`, decodedValue);
          } catch (error) {
            console.log(`❌ Failed to read characteristic ${c.characteristic} of service ${c.service}:`, error.message);
          }
        } else {
          console.log(`⏩ [Service ${c.service}] Characteristic ${c.characteristic} is not readable.`);
        }
      }

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

  return (
    <Button
      title={connected ? 'Disconnect from SmartBin' : 'Connect to SmartBin'}
      onPress={handlePress}
      color={connected ? '#4CAF50' : '#00796B'}
    />
  );
}
