import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const translateRepeatStatus = (status) => {
  if (!status) return "";
  const lower = status.toLowerCase();

  switch (lower) {
    case "scheduled":
      return "Agendado";
    case "confirmed":
      return "Confirmado";
    case "completed":
      return "Concluído";
    default:
      return status;
  }
};

export default function LembretesSection({ reminders }) {
  return (
    <View style={{ marginTop: 40 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lembretes</Text>
        <Pressable
          onPress={() => router.push("/screens/lembreteScreens/LembreteScreen")}
        >
          <Text style={styles.verTudo}>Ver tudo</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reminderScrollContainer}
      >
        {reminders?.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardVerticalBar} />

            <View style={{ paddingLeft: 14, flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>

              <View style={styles.cardFooter}>
                <Ionicons name="time-outline" size={16} color="#2F8B88" />
                <View style={{ marginLeft: 5 }}>
                  <Text style={styles.cardTime}>{item.time}</Text>
                  <Text style={styles.cardRepeatText}>
                    {translateRepeatStatus(item.repeat)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2F8B88",
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 15,
  },
  reminderScrollContainer: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    width: 238,
    height: 143,
    borderRadius: 16,
    padding: 14,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardVerticalBar: {
    width: 4,
    height: 60,
    backgroundColor: "#A8E6CF",
    borderRadius: 16,
    position: "absolute",
    left: 14,
    top: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2F8B88",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTime: {
    color: "#2F8B88",
    fontWeight: "600",
  },
  cardRepeatText: {
    color: "#2F8B88",
  },
});
