import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface DataPoint {
    timestamp: string;
    fill_level: number;
    battery_level: number;
}

const fixedData: DataPoint[] = [
    { timestamp: '2023-05-10', fill_level: 10, battery_level: 85 },
    { timestamp: '2023-05-11', fill_level: 15, battery_level: 90 },
    { timestamp: '2023-05-12', fill_level: 20, battery_level: 75 },
    { timestamp: '2023-05-13', fill_level: 40, battery_level: 65 },
    { timestamp: '2023-05-14', fill_level: 40, battery_level: 70 },
    { timestamp: '2023-05-15', fill_level: 55, battery_level: 60 },
    { timestamp: '2023-05-16', fill_level: 60, battery_level: 50 },
    { timestamp: '2023-05-17', fill_level: 65, battery_level: 80 },
    { timestamp: '2023-05-18', fill_level: 70, battery_level: 95 },
    { timestamp: '2023-05-19', fill_level: 80, battery_level: 55 }
];

const StatsGraph: React.FC = () => {
    const [selectedMetric, setSelectedMetric] = useState<'fill_level' | 'battery_level'>('fill_level');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fill level per day</Text>
            <ScrollView horizontal contentContainerStyle={styles.graph}>
                {fixedData.map((item, index) => (
                    <View key={index} style={styles.barContainer}>
                        <View style={[styles.bar, { height: item[selectedMetric] * 2, backgroundColor: selectedMetric === 'fill_level' ? '#82ca9d' : '#8884d8' }]}>                            
                            <Text style={styles.barText}>{item[selectedMetric]}%</Text>
                        </View>
                        <Text style={styles.label}>{item.timestamp.slice(5)}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 200,
        alignSelf: 'center',
        marginBottom: 10,
    },
    graph: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 5,
    },
    barContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    bar: {
        width: 20,
        marginVertical: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 4,
    },
    barText: {
        color: '#fff',
        fontSize: 12,
    },
    label: {
        fontSize: 12,
        marginTop: 4,
    },
});

export default StatsGraph;
