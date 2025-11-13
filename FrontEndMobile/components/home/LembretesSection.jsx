import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const STATUS_COLORS = {
  scheduled: "#2F8B88",
  confirmed: "#87CEEB",
  completed: "#90EE90",
  canceled: "#FF7F50",
};

const translateRepeatStatus = (status) => {
  if (!status) return "";
  const lowerCaseStatus = status.toLowerCase();

  switch (lowerCaseStatus) {
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

const EmptyStateMessage = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>Nenhum lembrete agendado.</Text>
  </View>
);

export default function LembretesSection({ reminders }) {
  const [avaliados, setAvaliados] = useState({});

  const handleAvaliar = (index) => {
    setAvaliados((prev) => ({ ...prev, [index]: true }));
    router.push("/screens/lembreteScreens/AvaliarScreen");
  };

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

      {reminders && reminders.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reminderScrollContainer}
        >
          {reminders.map((reminder, index) => {
            const translatedRepeat = translateRepeatStatus(reminder.repeat);
            const isCompleted = translatedRepeat.toLowerCase() === "concluído";

            const barColor =
              STATUS_COLORS[reminder.repeat?.toLowerCase()] || "#A8E6CF";

            return (
              <View style={styles.card} key={index}>
                {/* 🔹 Barra lateral dinâmica */}
                <View
                  style={[styles.cardVerticalBar, { backgroundColor: barColor }]}
                />

                <View style={styles.cardContent}>
                  <View>
                    <Text style={styles.cardTitle}>{reminder.title}</Text>
                    <Text style={styles.cardSubtitle}>{reminder.subtitle}</Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <Ionicons name="time-outline" size={16} color="#2F8B88" />
                    <View style={{ marginLeft: 5 }}>
                      <Text style={styles.cardTime}>{reminder.time}</Text>
                      <Text style={styles.cardRepeatText}>
                        {translatedRepeat}
                      </Text>
                    </View>

                    {isCompleted && (
                      <Pressable
                        style={[
                          styles.btnAvaliar,
                          avaliados[index] && { backgroundColor: "#ccc" },
                        ]}
                        onPress={() =>
                          !avaliados[index] ? handleAvaliar(index) : null
                        }
                      >
                        <Text style={styles.btnAvaliarText}>
                          {avaliados[index] ? "Avaliado" : "Avaliar"}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <EmptyStateMessage />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 15,
    fontWeight: "400",
  },
  reminderScrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: 238,
    height: 143,
    borderRadius: 10,
    padding: 10,
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  cardVerticalBar: {
    width: 4,
    height: 59,
    borderRadius: 16,
    position: "absolute",
    left: 20,
    top: 12,
  },
  cardContent: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontWeight: "500",
    color: "#2F8B88",
    fontSize: 15,
    marginLeft: 10,
  },
  cardSubtitle: {
    fontWeight: "400",
    fontSize: 13,
    color: "#555",
    marginLeft: 10,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginLeft: -5,
  },
  cardTime: {
    fontSize: 13,
    fontWeight: "400",
    color: "#2F8B88",
  },
  cardRepeatText: {
    fontSize: 13,
    color: "#2F8B88",
    marginTop: 2,
  },
  btnAvaliar: {
    marginLeft: "auto",
    backgroundColor: "#2F8B88",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnAvaliarText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
});
