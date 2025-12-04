import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function VacinaList({ vacinas, petName }) {

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("pt-BR");
    };

    return (
        <View style={styles.section}>

            <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>Vacinas</Text>
            </View>

            {vacinas?.length > 0 ? (
                vacinas.map((v, index) => {

                    const doseValue = v.doseMl ?? v.dose ?? v.dose_ml ?? "-";

                    return (
                        <View key={index} style={styles.card}>

                            <View style={styles.cardHeader}>
                                <Text style={styles.vacinaName}>{v.name ?? "Vacina"}</Text>

                                <Text
                                    style={[
                                        styles.statusText,
                                        { color: v.isCompleted ? "#4CAF50" : "#F57C00" }
                                    ]}
                                >
                                    {v.isCompleted ? "Completa" : "Incompleta"}
                                </Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Fabricante:</Text>
                                <Text style={styles.value}>{v.manufacturer ?? "-"}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Lote:</Text>
                                <Text style={styles.value}>{v.batch ?? "-"}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Dose (mL):</Text>
                                <Text style={styles.value}>{doseValue}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Aplicada:</Text>
                                <Text style={styles.value}>{formatDate(v.appliedAt)}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Próxima:</Text>
                                <Text style={styles.value}>{formatDate(v.nextDoseAt)}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Vet:</Text>
                                <Text style={styles.value}>{v.veterinarian ?? "-"}</Text>
                            </View>

                            {v.notes ? (
                                <View style={styles.row}>
                                    <Text style={styles.label}>Observações: </Text>
                                    <Text style={styles.value}>{v.notes}</Text>
                                </View>
                            ) : null}

                        </View>
                    );
                })
            ) : (
                <Text style={styles.emptyText}>Nenhuma vacina cadastrada para {petName}.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 25,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        paddingRight: 8,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2F8B88",
    },
    emptyText: {
        fontSize: 14,
        color: "#999",
        marginTop: 5,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 18,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    statusText: {
        fontSize: 14,
        fontWeight: "600",
    },
    vacinaName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        marginBottom: 3,
    },
    label: {
        color: "#2F8B88",
        fontWeight: "600",
        width: 110,
    },
    value: {
        color: "#444",
        fontSize: 14,
        flexShrink: 1,
    },
});
