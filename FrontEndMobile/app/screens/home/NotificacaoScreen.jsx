import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView, Platform, StatusBar, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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
        title: "Lembre-se de verificar a vacina do seu pet",
        time: "10:00",
    },
    {
        id: 4,
        group: "10 Ago",
        icon: "stethoscope",
        iconColor: "#2F8B88",
        iconBg: "#FFD25F",
        title: "Prada tem uma consulta com o veterinário amanhã às 17h30.",
        time: "09:15",
    },
    {
        id: 5,
        group: "10 Ago",
        icon: "pill",
        iconColor: "#2F8B88",
        iconBg: "#FF9D97",
        title: "Hora do remédio da Bella! Dose: 1 comprimido às 07h.",
        time: "07:00",
    },
];

const NotificationItem = ({ petImage, icon, iconColor, iconBg, title, time }) => {
    const circleContent = petImage ? (
        <Image source={petImage} style={styles.petImage} resizeMode="contain" />
    ) : (
        <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
    );

    const circleStyle = [styles.iconContainer, { backgroundColor: petImage ? "#A8E6CF" : iconBg }];

    return (
        <View style={styles.notificationItem}>
            <View style={circleStyle}>
                {circleContent}
            </View>
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{title}</Text>
                <Text style={styles.notificationTime}>{time}</Text>
            </View>
        </View>
    );
};

export default function NotificacaoScreen() {
    const router = useRouter();

    const groupedNotifications = NOTIFICATIONS.reduce((acc, notification) => {
        (acc[notification.group] = acc[notification.group] || []).push(notification);
        return acc;
    }, {});

    return (
        <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>

            <View style={styles.container}>

                <View style={styles.header}>
                    <Pressable
                        onPress={() => { router.back() }}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={"#2F8B88"} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Notificações</Text>
                </View>

                <View style={styles.contentWrapper}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {Object.entries(groupedNotifications).map(([group, notifications]) => (
                            <View key={group} style={styles.section}>
                                <Text style={styles.sectionHeader}>{group}</Text>

                                <View style={styles.notificationList}>
                                    {notifications.map((item, index) => (
                                        <NotificationItem
                                            key={item.id}
                                            {...item}
                                            style={index < notifications.length - 1 ? styles.notificationItem
                                                : [styles.notificationItem, { borderBottomWidth: 0 }]}
                                        />
                                    ))}
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: 20,
        position: "relative",
        zIndex: 10,
        backgroundColor: "#F9F9F9",
        marginTop: 40
    },
    backButton: {
        position: "absolute",
        left: 20,
        paddingVertical: 10,
        paddingRight: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2F8B88",
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
        marginTop: 30
    },
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
        color: "#2F8B88",
        fontWeight: "regular",
    },
    notificationTime: {
        fontSize: 13,
        color: "#A9A9A9",
        fontWeight: "regular",
        marginTop: 2,
    },
});