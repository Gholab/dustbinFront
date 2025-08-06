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
          style={[styles.picker, { color: 'black' }]}
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  pickerContainer: {
    backgroundColor: '#e0eaba',
    borderRadius: 10,
    overflow: 'hidden',
    width: '25%',
    elevation: 2,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: 5
  },
  picker: {
    height: 55,
    width: '100%',
  },
});

export default PeriodSelector;