import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

interface InfoBoxProps {
  connected: boolean;
  batteryLevel?: number;
  fillLevel?: number;
}

const InfoBox: React.FC<InfoBoxProps> = ({ connected, batteryLevel, fillLevel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="info" size={24} color="#1B4332" />
        <Text style={styles.title}>Information:</Text>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.statusText, { color: connected ? '#2E7D32' : '#D32F2F' }]}>
          {connected ? 'Connected' : 'Disconnected'}
        </Text>
        <MaterialIcons
          name={connected ? 'check-circle' : 'cancel'}
          size={16}
          color={connected ? '#2E7D32' : '#D32F2F'}
        />
      </View>

      {connected && (
        <>
          <View style={styles.dataRow}>
            <MaterialCommunityIcons name="battery-charging" size={20} color="#1B4332" />
            <Text style={styles.dataLabel}>Battery level</Text>
            <Text style={styles.dataValue}>{batteryLevel ?? 0}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${batteryLevel ?? 0}%` }]} />
          </View>

          <View style={styles.dataRow}>
            <MaterialCommunityIcons name="speedometer" size={20} color="#1B4332" />
            <Text style={styles.dataLabel}>Fill level</Text>
            <Text style={styles.dataValue}>{fillLevel ?? 0}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${fillLevel ?? 0}%` }]} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0eaba',
    padding: 16,
    borderRadius: 16,
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  title: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '600',
    color: '#1B4332',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '500',
    fontSize: 16,
    marginRight: 4,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  dataLabel: {
    marginLeft: 6,
    flex: 1,
    fontSize: 14,
    color: '#1B4332',
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1B4332',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 4,
    marginBottom: 10,
  },
  progress: {
    height: 4,
    backgroundColor: '#1B4332',
    borderRadius: 2,
  },
});

export default InfoBox;