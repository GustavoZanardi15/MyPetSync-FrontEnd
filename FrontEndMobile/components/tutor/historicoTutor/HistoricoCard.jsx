import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const getCorPorStatus = (status, isReviewed) => {
    if (isReviewed) return "#FFD54F";

    switch (status) {
        case "scheduled":
        case "Agendado":
            return "#2F8B88";
        case "confirmed":
        case "Confirmado":
            return "#87CEEB";
        case "completed":
        case "Concluído":
            return "#90EE90";
        case "canceled":
        case "Cancelado":
            return "#FF7F50";
        default:
            return "#2F8B88";
    }
};

const formatarStatus = (status) => {
    switch (status) {
        case "scheduled":
        case "Agendado":
            return "Agendado";
        case "confirmed":
        case "Confirmado":
            return "Confirmado";
        case "completed":
        case "Concluído":
            return "Concluído";
        case "canceled":
        case "Cancelado":
            return "Cancelado";
        default:
            return status;
    }
};

export default function HistoricoCard({ item }) {
    const petName = item.petName || "";
    const hasPetInfo = petName !== "";

    const corLateral = getCorPorStatus(item.status, item.isReviewed);

    const mostrarBadgeAvaliado = item.isReviewed;
    const mostrarBadgeStatus = !item.isReviewed;

    return (
        <View style={styles.card}>
            <View style={[styles.cardAccent, { backgroundColor: corLateral }]} />

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.textBlock}>
                        <Text numberOfLines={1} style={styles.nameText}>
                            Prestador(a): {item.profissionalNome}
                        </Text>

                        {hasPetInfo && (
                            <View style={styles.petRow}>
                                <Text numberOfLines={1} style={styles.petText}>
                                    Pet: {petName}
                                </Text>
                            </View>
                        )}

                        <Text numberOfLines={1} style={styles.specialtyText}>
                            Motivo: {item.profissionalEspecialidade}
                        </Text>
                    </View>

                    {mostrarBadgeAvaliado && (
                        <View style={styles.reviewBadge}>
                            <Ionicons name="star" size={14} color="#FFD54F" />
                            <Text style={styles.reviewBadgeText}> Avaliado</Text>
                        </View>
                    )}

                    {mostrarBadgeStatus && (
                        <View style={styles.statusBadge}>
                            <Text style={[styles.statusBadgeText, { color: corLateral }]}>
                                {formatarStatus(item.status)}
                            </Text>
                        </View>
                    )}

                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>
                            {item.dateLabel}
                            {item.diaSemana ? ` , ${item.diaSemana}` : ""}
                        </Text>
                    </View>

                    <View style={styles.footerRow}>
                        <Ionicons
                            name="time-outline"
                            size={16}
                            color={"#2F8B88"}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={styles.footerText}>{item.hora}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        marginBottom: 10,
        overflow: "hidden",
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
    },
    cardAccent: {
        width: 4,
    },
    cardContent: {
        flex: 1,
        padding: 12,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 8,
        justifyContent: "space-between",
    },
    textBlock: {
        flex: 1,
        marginRight: 8,
    },
    nameText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 2,
    },
    specialtyText: {
        fontSize: 15,
        color: "#555",
        marginBottom: 4,
    },
    petRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 4,
    },
    petText: {
        fontSize: 15,
        color: "#2F8B88",
        fontWeight: "500",
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footerRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    footerText: {
        fontSize: 14,
        color: "#2F8B88",
        fontWeight: "500",
    },
    reviewBadge: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 8,
    },
    reviewBadgeText: {
        color: "#FFD54F",
        fontSize: 14,
        fontWeight: "bold",
    },
    statusBadge: {
        alignSelf: "flex-start",
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginLeft: 6,
    },
    statusBadgeText: {
        fontSize: 13,
        fontWeight: "600",
    },
});
