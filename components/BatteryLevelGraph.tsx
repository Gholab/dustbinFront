import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';


interface DataPoint {
  timestamp: string;
  fill_level: number;
  battery: number;
}

interface FillLevelGraphProps {
  data: DataPoint[];
}

const BatteryLevelGraph: React.FC<FillLevelGraphProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Battery Level Overview</Text>
        <Text>No data available</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Level Overview</Text>
      <LineChart
        data={data.map((item) => ({
          value: item.battery,
          label: item.timestamp.slice(5),
          dataPointColor: 'green',
        }))}
        noOfSections={5}
        yAxisThickness={0}
        xAxisThickness={0}
        color="green"
        curved
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#E0EABA',
    borderRadius: 8,
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1B4332',
  },
});

export default BatteryLevelGraph;