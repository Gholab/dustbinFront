import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PeriodSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selected, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select period:</Text>
      <Picker
        selectedValue={selected}
        style={styles.picker}
        onValueChange={onChange}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Day" value="day" />
        <Picker.Item label="Month" value="month" />
        <Picker.Item label="Year" value="year" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: 200,
  },
});

export default PeriodSelector;
