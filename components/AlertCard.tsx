import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type AlertType = 'warning' | 'error' ;

interface AlertCardProps {
  type: AlertType;
  title: string;
  message: string;
  date: string;
  time: string;
}

const AlertCard: React.FC<AlertCardProps> = ({ type, title, message, date, time }) => {
  const backgroundColor = type === 'warning' ? '#f7cb87' : '#e8a6a1';
  const titleColor = type === 'warning' ? '#7a4f01' : '#7a1212';

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        <View style={styles.datetime}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 14,
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  datetime: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 13,
    color: '#3b3b3b',
  },
  time: {
    fontSize: 13,
    color: '#3b3b3b',
  },
  message: {
    fontSize: 14,
    color: '#3b3b3b',
    marginTop: 2,
  },
});

export default AlertCard;
