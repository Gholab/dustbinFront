import { View, Text } from "react-native";
import AlertCard from "@/components/AlertCard";

export default function alertPage() {
    return (
        <View style={{ flex: 1, backgroundColor: "#faf3d5", padding: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1B4332", marginBottom: 10, textAlign: "center" }}>
                Alerts</Text>
            <AlertCard
                type="warning"
                title="Trash Detected"
                message="Trash detected on the floor, please throw it in the bin."
                date="02/06/2025"
                time="13:58:13"
                />
            <AlertCard
                type="error"
                title="Bin Full"
                message="The bin is full, please empty the bin."
                date="02/06/2025"
                time="14:24:43"
                />
        </View>
    );
}
