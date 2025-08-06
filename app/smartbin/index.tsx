import { Image } from 'expo-image';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useRef, useState } from 'react';
import ConnectButton, { actionsOnDustbin } from '@/components/ConnectButton';
import InfoBox from '@/components/InfoBox';
import IconButton from '@/components/IconButton';
import { Picker } from '@react-native-picker/picker';
import { Button } from '@react-navigation/elements';
import { useAlert } from '@/components/AlertContext';

export default function HomePage() {
  const [connected, setConnected] = useState(false);
  const [fillLevel, setFillLevel] = useState(20);
  const [batteryLevel, setBatteryLevel] = useState(90);
  const [device, setDevice] = useState<any>(null);
  const [moving, setMoving] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [garbageType, setGarbageType] = useState('');
  const [quantity, setQuantity] = useState('');
  const { addAlert } = useAlert();

  const handleBinFull = () => {
    console.log('Bin is full, please empty it!');
    addAlert("warning", "Bin Full", "The bin is full, please empty it!");
  };

  const handleConnectedChange = (connected: boolean) => {
    setConnected(connected);
  };

  const handleSubmit = () => {
    console.log('Type:', garbageType, 'Quantity:', quantity);
    fetch('https://backendsmartbin-production.up.railway.app/trashInfos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device_id: 'bin01',
        type: garbageType,
        quantity: quantity,
        timestamp: new Date().toISOString(),
      }),
    });
    setIsModalVisible(false); // fermer le modal après envoi
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
                  onPress={() => {console.log('Charging'); actionsOnDustbin(0, device);}}
                />
                <IconButton
                  iconName="map-marker"
                  label={ !moving ? "Move towards User" : "Stop Moving"}
                  onPress={() => {console.log('Moving'); actionsOnDustbin(1, device); moving ? setMoving(false) : setMoving(true);}}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 10, gap:20}}>
                <IconButton 
                  iconName="lock-open-outline"
                  label="Open SmartBin"
                  onPress={() => {console.log('Open SmartBin'); actionsOnDustbin(3, device);}}
                />
                <IconButton
                  iconName="lock-outline"
                  label="Close SmartBin"
                  onPress={() => {
                    console.log('Close SmartBin'); 
                    actionsOnDustbin(2, device);
                    setIsModalVisible(true);
                  }}
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
          setDeviceConnected={setDevice}
          onBinFull={handleBinFull}
        />
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide" // ou "fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Garbage Info</Text>

            <Picker
              selectedValue={garbageType}
              onValueChange={(itemValue) => setGarbageType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Plastic ♻️" value="plastic" />
              <Picker.Item label="Glass 🍾" value="glass" />
              <Picker.Item label="Paper 📄" value="paper" />
              <Picker.Item label="Metal 🥫" value="metal" />
              <Picker.Item label="Organic 🌱" value="organic" />
              <Picker.Item label="Other 🗑️" value="other" />
            </Picker>
            <TextInput
              placeholder="Quantity (in grams)"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              style={styles.input}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
            
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#1B4332',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#E63946',
    marginTop: 5,
  },
  picker: {
    width: '100%',
    marginBottom: 15,
  },
});