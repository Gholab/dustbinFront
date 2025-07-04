import { Image } from 'expo-image';
import { StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import ConnectButton from '@/components/ConnectButton';
import BinStats from '@/components/BinStats';

export default function HomePage() {
  const [connected, setConnected] = useState(false);
  const [fillLevel, setFillLevel] = useState(20);
  const [batteryLevel, setBatteryLevel] = useState(90);

  const handleConnectedChange = (connected: boolean) => {
    setConnected(connected);
  };


  return (
    <View style={styles.container}>
      

      {!connected && (
        <>
          <Image source={require('../../assets/images/logoTransparent.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome to SmartBin</Text>
          <Text style={styles.subtitle}>Your smart waste assistant</Text>
        </>
      )}
      

      <ConnectButton onConnectedChange={handleConnectedChange} setBatteryLevel={setBatteryLevel} setFillLevel={setFillLevel}/>
      
      {connected && (
        <BinStats fillLevel={fillLevel} batteryLevel={batteryLevel} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
  },
  title: {
    fontSize: 26, fontWeight: 'bold', marginBottom: 10
  },
  subtitle: {
    fontSize: 16, marginBottom: 40, color: '#555'
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 100
  },
});