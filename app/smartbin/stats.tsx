import { ScrollView, View} from 'react-native';
import FillLevelGraph from '@/components/FillLevelGraph';
import BatteryLevelGraph from '@/components/BatteryLevelGraph';
import EcoFriendyGraph from '@/components/EcoFriendlyGraph';
import React, { useEffect, useState } from 'react';
import PeriodSelector from '@/components/PeriodSelector';
import Constants from 'expo-constants';

const apiBaseUrl = Constants.expoConfig?.extra?.API_BASE_URL;
const prodApiBaseUrl = Constants.expoConfig?.extra?.PROD_API_BASE_URL;
const env = Constants.expoConfig?.extra?.APP_ENV || "dev" ;

const BASE_URL = env === "dev" ? apiBaseUrl : prodApiBaseUrl;


type Measurement = {
  device_id: string;
  timestamp: string;
  fill_level: number;
  battery: number;
};

type WasteData = {
  device_id: string;
  type: string;
  quantity: number;
  timestamp: string;
};

export default function StatsPage() {
  const [period, setPeriod] = useState('all');
  const [data, setData] = useState<Measurement[]>([]);
  const [trashData, setTrashData] = useState<WasteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${BASE_URL}/measurements`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Erreur lors du fetch des mesures :', err);
      } finally {
        setLoading(false);
      }
    }
    async function fetchTrashData() {
      try{
        const res = await fetch(`${BASE_URL}/trashInfos`);
        const json = await res.json();
        setTrashData(json);
      } catch (err) {
        console.error('Erreur lors du fetch des données de déchets :', err);
      }
    }
    fetchData();
    fetchTrashData();
  }, []);

  console.log('Fetched data:', data.length);
  console.log('Fetched trash data:', trashData.length);

  const filteredData = data.filter((item) => {
    const date = new Date(item.timestamp);
    const now = new Date();
    if (period === 'day') return date.toDateString() === now.toDateString();
    if (period === 'month') return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    if (period === 'year') return date.getFullYear() === now.getFullYear();
    return true; 
  });

  console.log(filteredData.length, 'filtered data length');
  

  const filteredWaste = trashData.filter((item) => {
    const date = new Date(item.timestamp);
    const now = new Date();
    if (period === 'day') return date.toDateString() === now.toDateString();
    if (period === 'month') return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    if (period === 'year') return date.getFullYear() === now.getFullYear();
    return true;
  });
  const plasticCount = filteredWaste.filter(item => item.type === 'plastic').length;
  const glassCount = filteredWaste.filter(item => item.type === 'glass').length;
  const metalCount = filteredWaste.filter(item => item.type === 'metal').length;
  const organicCount = filteredWaste.filter(item => item.type === 'organic').length;
  const paperCount = filteredWaste.filter(item => item.type === 'paper').length;
  const otherCount = filteredWaste.filter(item => item.type === '').length;
  

  const total = plasticCount + glassCount + metalCount + organicCount + paperCount + otherCount;
  const pieData = total > 0 ? [
    {
      label: 'Organic',
      value: Math.round((organicCount / total) * 100),
      color: '#85d487ff'
    },
    {
      label: 'Platic',
      value: Math.round((plasticCount / total) * 100),
      color: '#ffef75ff'
    },
    {
      label: 'Glass',
      value: Math.round((glassCount / total) * 100),
      color: '#2196F3'
    },
    {
      label: 'Metal',
      value: Math.round((metalCount / total) * 100),
      color: '#FFC107'
    },
    {
      label: 'Organic',
      value: Math.round((organicCount / total) * 100),
      color: '#4CAF50'
    },
    {
      label: 'Paper',
      value: Math.round((paperCount / total) * 100),
      color: '#9C27B0'
    },
    {
      label: 'Other',
      value: Math.round((otherCount / total) * 100),
      color: '#607D8B'
    }
  ] : [];
  return (
    <View>

      {(
        <ScrollView style={{backgroundColor: '#faf3d5' }}>
          <PeriodSelector selected={period} onChange={setPeriod} />
          <FillLevelGraph data={filteredData} />
          <BatteryLevelGraph data={filteredData} />
          <EcoFriendyGraph data={pieData} />
        </ScrollView>
    )}
    </View>
  );
}
