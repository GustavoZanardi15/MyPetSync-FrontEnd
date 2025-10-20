import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PetInfo({ label, value }) {

    const isValueEmpty = value.trim() === "" || value.trim() === " ";

    return (
        <View style={styles.infoFieldContainer}>
            <Text style={styles.infoFieldLabel}>{label}</Text>
            <Text
                style={[
                    styles.infoFieldValue,
                    isValueEmpty && styles.infoFieldValueEmpty,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {isValueEmpty ? label : value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoFieldContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    infoFieldLabel: {
        fontSize: 12,
        color: "#8E8E8E",
        fontWeight: "regular",
        width: 100,
        textAlign: "left",
    },
    infoFieldValue: {
        flex: 1,
        fontSize: 15,
        color: "#2F8B88",
        fontWeight: "medium",
        textAlign: "left",
    },
    infoFieldValueEmpty: {
        color: "#2F8B88",
        fontWeight: "600",
        fontSize: 15,
    }
});
