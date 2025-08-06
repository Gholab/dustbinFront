import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
export const options = {
  headerShown: false,
};

export default function EntryScreen() {
  const router = useRouter();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/smartbin')}>
        <Text style={styles.buttonText}>Super Smart Bin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/neturna')}>
        <Text style={styles.buttonText}>Neturna</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf3d5',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: '#004d25',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#41744e',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    minWidth: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#faf3d5',
    fontSize: 18,
  },
});
