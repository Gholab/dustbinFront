import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import React, { useState } from 'react';
import StatsGraph from '@/components/StatsGraph';

export default function StatsPage() {
    return (
           
        <View style={{ padding: 20 }}>
            <StatsGraph/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
    },
    title: {
        fontSize: 26, fontWeight: 'bold', marginBottom: 10
    },
    subtitle: {
        fontSize: 16, marginBottom: 40, color: '#555'
    }
});