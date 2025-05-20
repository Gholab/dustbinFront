import { View } from 'react-native';
import StatsGraph from '@/components/StatsGraph';

const SmartBinStats: React.FC = () => {

    return (
        <View style={{ padding: 20 }}>
            <StatsGraph/>
        </View>
    );
};

export default SmartBinStats;
