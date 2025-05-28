import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';


interface DataPoint {
  timestamp: string;
  fill_level: number;
}

interface FillLevelGraphProps {
  data: DataPoint[];
}

const FillLevelGraph: React.FC<FillLevelGraphProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill Level Overview</Text>
      <BarChart
        data={data.map((item) => ({
          value: item.fill_level,
          label: item.timestamp.slice(5),
          frontColor: item.fill_level >= 80 ? 'red' : '#82ca9d',
        }))}
        barWidth={20}
        noOfSections={5}
        barBorderRadius={4}
        yAxisThickness={0}
        xAxisThickness={0}
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

export default FillLevelGraph;