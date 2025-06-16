import { View, Text } from "react-native";

export default function alertPage() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#faf3d5" }}>
            <Text style={{ fontSize: 24, color: '#1B4332' }}>Alerts Page</Text>
            <Text style={{ marginTop: 10, color: '#333' }}>This is where you will see alerts related to your SmartBin.</Text>
        </View>
    );
}
