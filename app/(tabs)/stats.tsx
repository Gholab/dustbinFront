import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import React, { useState } from 'react';

export default function StatsPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Statistics</Text>
            <Text style={styles.subtitle}>Your smart waste assistant</Text>
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