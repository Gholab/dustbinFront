import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconButtonProps = {
  iconName: string;
  label: string;
  onPress: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({ iconName, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={24} color="#1B4332" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e0eaba',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    height: 90,
    gap: 6,
  },
  label: {
    textAlign: 'center',
    color: '#1B4332',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default IconButton;
