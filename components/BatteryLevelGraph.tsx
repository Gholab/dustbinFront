import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';


interface DataPoint {
  timestamp: string;
  fill_level: number;
  battery_level: number;
}

interface FillLevelGraphProps {
  data: DataPoint[];
}

const BatteryLevelGraph: React.FC<FillLevelGraphProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Level Overview</Text>
      <LineChart
        data={data.map((item) => ({
          value: item.fill_level,
          label: item.timestamp.slice(5),
          dataPointColor: '#8884d8',
        }))}
        noOfSections={5}
        yAxisThickness={0}
        xAxisThickness={0}
        color="#8884d8"
        curved
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default BatteryLevelGraph;