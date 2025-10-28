import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function LembretesSection({ reminders }) {
  return (
    <View style={{ marginTop: 40 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lembretes</Text>
        <Pressable onPress={() => router.push("/screens/lembreteScreens/LembreteScreen")}>
        <Text style={styles.verTudo}>Ver tudo</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reminderScrollContainer}
      >
        <Pressable style={styles.cardAdd}>
          <Ionicons name="add" size={30} color="#2F8B88" />
        </Pressable>

        {reminders.map((reminder, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardVerticalBar} />

            <View style={{ paddingLeft: 10, flex: 1, justifyContent: "space-between" }}>
              <View>
                <Text style={styles.cardTitle}>{reminder.title}</Text>
                <Text style={styles.cardSubtitle}>{reminder.subtitle}</Text>
              </View>

              <View style={styles.cardFooter}>
                <Ionicons name="time-outline" size={16} color="#2F8B88" />
                <View style={{ marginLeft: 5 }}>
                  <Text style={styles.cardTime}>{reminder.time}</Text>
                  <Text style={styles.cardRepeatText}>{reminder.repeat}</Text>
                </View>
                <Ionicons
                  name="notifications"
                  size={24}
                  color="#2F8B88"
                  style={{ marginLeft: "auto" }}
                />
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
    alignItems: "center"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
    lineHeight: 27
  },
  verTudo: {
    color: "#87CEEB",
    fontSize: 15,
    fontWeight: "400"
  },
  reminderScrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20
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
    alignItems: "center"
  },
  cardAdd: {
    backgroundColor: "#fff",
    width: 44,
    height: 143,
    borderRadius: 10,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  cardVerticalBar: {
    width: 4,
    height: 59,
    backgroundColor: "#A8E6CF",
    borderRadius: 16,
    position: "absolute",
    left: 20,
    top: 12
  },
  cardTitle: {
    fontWeight: "500",
    color: "#2F8B88",
    fontSize: 15,
    marginLeft: 10
  },
  cardSubtitle: {
    fontWeight: "400",
    fontSize: 13,
    color: "#555",
    marginLeft: 10,
    marginTop: 2
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginLeft: -5
  },
  cardTime: {
    fontSize: 13,
    fontWeight: "400",
    color: "#2F8B88"
  },
  cardRepeatText: {
    fontSize: 13,
    color: "#2F8B88",
    fontWeight: "400",
    marginTop: 2
  }
});
