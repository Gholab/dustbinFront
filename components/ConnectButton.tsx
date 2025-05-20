import React, { useState } from 'react';
import { Button, Alert } from 'react-native';

type ConnectButtonProps = { // fonction appelée lors du clic du bouton
  onConnectedChange?: (connected: boolean) => void;
};

export default function ConnectButton({onConnectedChange }: ConnectButtonProps) {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState<any>(null);

  const connectToSmartBin = async () => {
    return new Promise<void>((resolve, reject) => {
      setDevice('SmartBinDevice'); // Simulate device connection
      setConnected(true);
      onConnectedChange?.(true);
      console.log(device);
      fetch('http://192.168.1.31:3000/measurements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          device_id: 'bin01',
          battery: 88,
          fill_level: 74,
          timestamp: new Date().toISOString(),
        }),
      });      
      Alert.alert('Connection', 'SmartBin connected!');
      resolve();
    });
  };

  const disconnectFromSmartBin = async () => {
    if (device) {
      console.log(`Disconnecting from ${device}`);
      
      setDevice(null);
    }
    setConnected(false);
    onConnectedChange?.(false);
    Alert.alert('Disconnection', 'SmartBin disconnected!');
  };

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
      title={connected ? 'Disconnected from SmartBin' : 'Connect to SmartBin'}
      onPress={handlePress}
      color={connected ? '#4CAF50' : '#00796B'}
    />
  );
}
