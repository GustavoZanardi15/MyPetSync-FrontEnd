import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import NotificationItem from "./NotificationItem";

export default function NotificationList({ notifications, onDelete }) {
  const groupedNotifications = notifications.reduce((acc, notification) => {
    (acc[notification.group] = acc[notification.group] || []).push(notification);
    return acc;
  }, {});

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {Object.entries(groupedNotifications).map(([group, list]) => (
        <View key={group} style={styles.section}>
          <Text style={styles.sectionHeader}>{group}</Text>
          <View style={styles.notificationList}>
            {list.map((item) => (
              <NotificationItem
                key={item.id}
                {...item}
                onDelete={() => onDelete(item.id)}
              />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#2F8B88",
    marginBottom: 10,
    marginLeft: 5,
  },
  notificationList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
});
