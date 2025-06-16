import { Image } from 'expo-image';
import { StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import ConnectButton from '@/components/ConnectButton';
import BinStats from '@/components/BinStats';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomePage() {
  const [connected, setConnected] = useState(false);
  const [fillLevel, setFillLevel] = useState(20);
  const [batteryLevel, setBatteryLevel] = useState(90);

  const handleConnectedChange = (connected: boolean) => {
    setConnected(connected);
  };


  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logoTransparent.png')}
          style={styles.logo}
        />
        <Text style={styles.welcome}>Welcome User</Text>

        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <MaterialIcons name="info" size={30} color="#1B4332" />
            <Text style={styles.infoTitle}>Information:</Text>
          </View>
          <View style={styles.statusRow}>
            <View style={styles.infos}>
              <Text style={styles.statusLabel}>Status:</Text>
              <Text style={[styles.statusText, { color: connected ? '#2E7D32' : '#D32F2F' }]}>
                {connected ? 'Connected' : 'Disconnected'}{' '}
              </Text>
              <MaterialIcons
                name={connected ? 'check-circle' : 'cancel'}
                size={16}
                color={connected ? '#2E7D32' : '#D32F2F'}
              />
            </View>
            {connected && (
              <BinStats fillLevel={fillLevel} batteryLevel={batteryLevel} />
            )}
          </View>
        </View>
        <ConnectButton onConnectedChange={handleConnectedChange} setBatteryLevel={setBatteryLevel} setFillLevel={setFillLevel}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#faf3d5",
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#DFF0C2',
    borderRadius: 10,
    padding: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 40,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoTitle: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#1B4332',
  },
  statusRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 4,
  },
  infos:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  statusLabel: {
    fontWeight: '600',
    marginRight: 4,
    fontSize: 20,
  },
  statusText: {
    fontWeight: '600',
    marginRight: 4,
    fontSize: 20,
  },
});