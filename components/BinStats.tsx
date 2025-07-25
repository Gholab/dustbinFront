import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BinStatsProps = {
  fillLevel: number;
  batteryLevel: number;
};

export default function BinStats({ fillLevel, batteryLevel }: BinStatsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 SmartBin Stats</Text>
      <Text>Fill level: {fillLevel}%</Text>
      <Text>Battery: {batteryLevel}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 18,
  },
});
