import React, { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import AlertCard from "@/components/AlertCard";
import { useAlert } from "@/components/AlertContext";

export default function AlertPage() {
  const {alerts, removeAlert} = useAlert(); 

  return (
    <View style={{ flex: 1, backgroundColor: "#faf3d5", padding: 10 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#1B4332",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Alerts
      </Text>

      <ScrollView>
        {[...alerts].reverse().map((alert, index) => (
          <AlertCard
            key={index}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            date={alert.date}
            time={alert.time}
            onRemove={() => removeAlert(alerts.length - 1 - index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}