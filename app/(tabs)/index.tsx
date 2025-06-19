import { Image } from 'expo-image';
import { StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import ConnectButton from '@/components/ConnectButton';
import InfoBox from '@/components/InfoBox';
import IconButton from '@/components/IconButton';

export default function HomePage() {
  const [connected, setConnected] = useState(false);
  const [fillLevel, setFillLevel] = useState(20);
  const [batteryLevel, setBatteryLevel] = useState(90);

  const handleConnectedChange = (connected: boolean) => {
    setConnected(connected);
  };


  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
          source={require('../../assets/images/logoTransparent.png')}
          style={styles.logo}/>
          <Text style={styles.welcome}>Welcome User</Text>
        </View>
          <InfoBox connected={connected} batteryLevel={batteryLevel} fillLevel={fillLevel} />
          {
            connected  && (
              <>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 5, gap:20, marginTop: 10}}>
                <IconButton 
                  iconName="battery-charging"
                  label="Move to Charging Station"
                  onPress={() => console.log('Charging')}
                />
                <IconButton
                  iconName="map-marker"
                  label="Move towards User"
                  onPress={() => console.log('Moving')}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 10, gap:20}}>
                <IconButton 
                  iconName="lock-open-outline"
                  label="Open SmartBin"
                  onPress={() => console.log('Open SmartBin')}
                />
                <IconButton
                  iconName="lock-outline"
                  label="Close SmartBin"
                  onPress={() => console.log('Close SmartBin')}
                />
              </View>
              </>
            )
          }
      <View style={{ marginTop: 10 }}>
        <ConnectButton
          onConnectedChange={handleConnectedChange}
          setBatteryLevel={setBatteryLevel}
          setFillLevel={setFillLevel}
        />
²     </View>
            
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor: "#faf3d5",
  },
  welcomeContainer: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 5,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 25,
    color: '#004d25',
  }

});