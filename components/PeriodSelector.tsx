import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PeriodSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selected, onChange }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Select period</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selected}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor="#555"
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Day" value="day" />
          <Picker.Item label="Month" value="month" />
          <Picker.Item label="Year" value="year" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: '80%',
    elevation: 2,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default PeriodSelector;