import { View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Text, StyleSheet, ScrollView } from 'react-native';

interface PieDataItem {
  label: string;
  value: number;
  color: string;
}

interface EcoFriendlyGraphProps {
  data: PieDataItem[];
}

const EcoFriendlyGraph: React.FC<EcoFriendlyGraphProps> = ({ data }) => {
  return (
    <View style={styles.pieContainer}>
      <Text style={styles.title}>Waste Type Breakdown</Text>
      <PieChart
        data={data}
        donut
        radius={100}
        innerRadius={60}
        focusOnPress
        showText
        textColor="white"
        textSize={12}
        showValuesAsLabels

      />
      {/* légende */}
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
            <View key={index} style={styles.legendItem}> 
                <View style={[styles.colorBox, { backgroundColor: item.color}]}/>
                <Text>{item.label}</Text>
            </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pieContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendContainer: {
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 14,
    color: '#333',
  },
});

export default EcoFriendlyGraph;