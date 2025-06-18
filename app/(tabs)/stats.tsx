import { StyleSheet, ScrollView, Text, View} from 'react-native';
import FillLevelGraph from '@/components/FillLevelGraph';
import BatteryLevelGraph from '@/components/BatteryLevelGraph';
import EcoFriendyGraph from '@/components/EcoFriendlyGraph';
import { useState } from 'react';
import PeriodSelector from '@/components/PeriodSelector';


const fixedData = [
{ timestamp: '2025-01-10T08:30', fill_level: 10, battery_level: 20 },
{ timestamp: '2025-01-15T12:00', fill_level: 30, battery_level: 90 },
{ timestamp: '2025-02-03T14:15', fill_level: 60, battery_level: 75 },
{ timestamp: '2025-02-20T09:45', fill_level: 90, battery_level: 65 },
{ timestamp: '2025-03-11T18:30', fill_level: 15, battery_level: 30 },
{ timestamp: '2025-03-25T10:00', fill_level: 50, battery_level: 60 },
{ timestamp: '2025-04-05T11:20', fill_level: 80, battery_level: 10 },
{ timestamp: '2025-04-17T13:50', fill_level: 35, battery_level: 80 },
{ timestamp: '2025-05-02T15:10', fill_level: 70, battery_level: 95 },
{ timestamp: '2025-05-19T17:25', fill_level: 85, battery_level: 55 },
{ timestamp: '2025-05-28T15:00', fill_level: 20, battery_level: 40 },
{ timestamp: '2025-05-29T16:00', fill_level: 25, battery_level: 40 },
{ timestamp: '2025-05-29T19:00', fill_level: 50, battery_level: 15 },
{ timestamp: '2025-06-02T15:10', fill_level: 70, battery_level: 95 },
{ timestamp: '2025-06-02T17:25', fill_level: 85, battery_level: 55 },
{ timestamp: '2025-06-03T15:00', fill_level: 20, battery_level: 40 },
{ timestamp: '2025-06-03T16:00', fill_level: 25, battery_level: 25 },

];

const wasteData = [
    { timestamp: '2025-01-10T08:30', label: 'Eco-friendly' },
    { timestamp: '2025-01-15T12:00', label: 'Non Eco-friendly'},
    { timestamp: '2025-02-03T14:15', label: 'Eco-friendly' },
    { timestamp: '2025-02-20T09:45', label: 'Non Eco-friendly' },
    { timestamp: '2025-03-11T18:30', label: 'Eco-friendly' },
    { timestamp: '2025-03-25T10:00', label: 'Non Eco-friendly' },
    { timestamp: '2025-04-05T11:20', label: 'Eco-friendly' },
    { timestamp: '2025-04-17T13:50', label: 'Non Eco-friendly' },
    { timestamp: '2025-05-02T15:10', label: 'Eco-friendly' },
    { timestamp: '2025-05-19T17:25', label: 'Non Eco-friendly' },
    { timestamp: '2025-05-28T19:00', label: 'Eco-friendly' },
    { timestamp: '2025-05-28T15:00', label: 'Eco-friendly'},
    { timestamp: '2025-05-29T16:00', label: 'Non Eco-friendly' },
    { timestamp: '2025-05-29T19:00', label: 'Eco-friendly'},
    { timestamp: '2025-06-02T19:00', label: 'Eco-friendly' },
    { timestamp: '2025-06-02T15:00', label: 'Eco-friendly'},
    { timestamp: '2025-06-03T16:00', label: 'Eco-friendly' },
    { timestamp: '2025-06-03T16:00', label: 'Eco-friendly'}
];

export default function StatsPage() {
  const [period, setPeriod] = useState('all');
  const filteredData = fixedData.filter((item) => {
    const date = new Date(item.timestamp);
    const now = new Date();
    if (period === 'day') return date.toDateString() === now.toDateString();
    if (period === 'month') return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    if (period === 'year') return date.getFullYear() === now.getFullYear();
    return true; 
  });
  const filteredWaste = wasteData.filter((item) => {
    const date = new Date(item.timestamp);
    const now = new Date();
    if (period === 'day') return date.toDateString() === now.toDateString();
    if (period === 'month') return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    if (period === 'year') return date.getFullYear() === now.getFullYear();
    return true;
  });
    const ecoCount = filteredWaste.filter(item => item.label === 'Eco-friendly').length;
  const nonEcoCount = filteredWaste.filter(item => item.label !== 'Eco-friendly').length;
  
  const total = ecoCount + nonEcoCount;
  const pieData = total > 0 ? [
    {
      label: 'Eco-friendly',
      value: Math.round((ecoCount / total) * 100),
      color: '#4CAF50'
    },
    {
      label: 'Non Eco-friendly',
      value: Math.round((nonEcoCount / total) * 100),
      color: '#F44336'
    }
  ] : [];
  return (   
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#faf3d5' }}>
      <PeriodSelector selected={period} onChange={setPeriod} />
      <FillLevelGraph data={filteredData} />
      <BatteryLevelGraph data={filteredData} />
      <EcoFriendyGraph data={pieData} />
    </ScrollView>
  );
}
