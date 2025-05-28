import { StyleSheet, ScrollView} from 'react-native';
import FillLevelGraph from '@/components/FillLevelGraph';
import BatteryLevelGraph from '@/components/BatteryLevelGraph';
import EcoFriendyGraph from '@/components/EcoFriendlyGraph';
import { useState } from 'react';
import PeriodSelector from '@/components/PeriodSelector';


const fixedData = [
{ timestamp: '2023-01-10T08:30', fill_level: 10, battery_level: 20 },
{ timestamp: '2023-01-15T12:00', fill_level: 30, battery_level: 90 },
{ timestamp: '2023-02-03T14:15', fill_level: 60, battery_level: 75 },
{ timestamp: '2023-02-20T09:45', fill_level: 90, battery_level: 65 },
{ timestamp: '2023-03-11T18:30', fill_level: 15, battery_level: 30 },
{ timestamp: '2023-03-25T10:00', fill_level: 50, battery_level: 60 },
{ timestamp: '2023-04-05T11:20', fill_level: 80, battery_level: 10 },
{ timestamp: '2023-04-17T13:50', fill_level: 35, battery_level: 80 },
{ timestamp: '2023-05-02T15:10', fill_level: 70, battery_level: 95 },
{ timestamp: '2023-05-19T17:25', fill_level: 85, battery_level: 55 }
];

const wasteData = [
  { label: 'Eco-friendly', value: 65, color: '#4CAF50' },
  { label: 'Non Eco-friendly', value: 35, color: '#F44336' }
];




export default function StatsPage() {
    const [period, setPeriod] = useState('all');
    const filteredData = fixedData.filter((item) => {
  const date = new Date(item.timestamp);
  const now = new Date();
  if (period === 'day') return date.toDateString() === now.toDateString();
  if (period === 'month') return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  if (period === 'year') return date.getFullYear() === now.getFullYear();
  return true; // 'all'
});

    return (
           
        <ScrollView style={{ padding: 20 }}>
            <PeriodSelector selected={period} onChange={setPeriod} />
            <FillLevelGraph data={filteredData} />
            <BatteryLevelGraph data={filteredData} />
            <EcoFriendyGraph data={wasteData} />
        </ScrollView>


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