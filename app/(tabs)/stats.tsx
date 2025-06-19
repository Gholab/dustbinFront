import { StyleSheet, ScrollView, Text, View} from 'react-native';
import FillLevelGraph from '@/components/FillLevelGraph';
import BatteryLevelGraph from '@/components/BatteryLevelGraph';
import EcoFriendyGraph from '@/components/EcoFriendlyGraph';
import { useEffect, useState } from 'react';
import PeriodSelector from '@/components/PeriodSelector';


type Measurement = {
  device_id: string;
  timestamp: string;
  fill_level: number;
  battery: number;
};

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
    { timestamp: '2025-06-03T16:00', label: 'Eco-friendly'},
    { timestamp: '2025-06-19T16:00', label: 'Eco-friendly'},
    { timestamp: '2025-06-03T16:00', label: 'Non Eco-friendly'}
];

export default function StatsPage() {
  const [period, setPeriod] = useState('all');
  const [data, setData] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://192.168.1.70:3000/measurements'); // adapte l’URL si besoin
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Erreur lors du fetch des mesures :', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log('Fetched data:', data.length);
  
  const filteredData = data.filter((item) => {
    const date = new Date(item.timestamp);
    const now = new Date();
    if (period === 'day') return date.toDateString() === now.toDateString();
    if (period === 'month') return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    if (period === 'year') return date.getFullYear() === now.getFullYear();
    return true; 
  });

  console.log(filteredData.length, 'filtered data length');
  

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
