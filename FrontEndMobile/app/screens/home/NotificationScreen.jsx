import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import NotificacaoHeader from "../../../components/notification/NotificationHeader";
import NotificationList from "../../../components/notification/NotificationList";

const NOTIFICATIONS = [
  {
    id: 1,
    group: "Hoje",
    icon: "stethoscope",
    iconColor: "#2F8B88",
    iconBg: "#FFD25F",
    title: "A consulta da Prada é hoje às 17h30",
    time: "18 min",
  },
  {
    id: 2,
    group: "10 Ago",
    petImage: require("../../../assets/images/addPet/Dog.png"),
    title: "Pet adicionado com sucesso!",
    time: "11:43",
  },
  {
    id: 3,
    group: "10 Ago",
    icon: "needle",
    iconColor: "#2F8B88",
    iconBg: "#F3E5F5",
    title: "Lembre-se de verificar a \nvacina do seu pet",
    time: "10:00",
  },
  {
    id: 4,
    group: "10 Ago",
    icon: "stethoscope",
    iconColor: "#2F8B88",
    iconBg: "#FFD25F",
    title: "Prada tem uma consulta com o\nveterinário amanhã às 17h30.",
    time: "09:15",
  },
  {
    id: 5,
    group: "10 Ago",
    icon: "pill",
    iconColor: "#2F8B88",
    iconBg: "#FF9D97",
    title: "Hora do remédio da Bella! \nDose: 1 comprimido às 07h.",
    time: "07:00",
  },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = React.useState(NOTIFICATIONS);

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <View style={styles.container}>
      <NotificacaoHeader />
      <View style={styles.contentWrapper}>
        <NotificationList notifications={notifications} onDelete={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 30,
  },
});
