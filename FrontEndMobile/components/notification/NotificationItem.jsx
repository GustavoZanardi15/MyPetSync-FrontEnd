import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

export default function NotificationItem({ petImage, icon, iconColor, iconBg, title, time, onDelete}) {
  const circleContent = petImage ? (
    <Image source={petImage} style={styles.petImage} resizeMode="contain" />
  ) : (
    <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
  );

  const circleStyle = [
    styles.iconContainer,
    { backgroundColor: petImage ? "#A8E6CF" : iconBg },
  ];

  const renderRightActions = () => (
    <View style={styles.rightActionContainer}>
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={28}
          color="#E63946"
        />
      </Pressable>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.notificationItem}>
        <View style={circleStyle}>{circleContent}</View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{title}</Text>
          <Text style={styles.notificationTime}>{time}</Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    overflow: "hidden",
  },
  petImage: {
    width: 24,
    height: 24,
  },
  notificationContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "regular",
    color: "#2F8B88",
  },
  notificationTime: {
    fontSize: 13,
    fontWeight: "regular",
    color: "#A9A9A9",
    marginTop: 2,
  },
  rightActionContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    backgroundColor: "transparent",
  },
  deleteButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#FF3B30",
    width: 45,
    height: 45,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
