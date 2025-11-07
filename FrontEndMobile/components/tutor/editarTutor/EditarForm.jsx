import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function EditarForm({ label, value, onChange, keyboardType = "default" }) {
    return (
        <View style={styles.editableContainer}>
            <Text style={styles.editableLabel}>{label}</Text>

            <TextInput
                style={[styles.editableValue, { color: "#2F8B88" }]}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
                selectionColor={"#2F8B88"} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    editableContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12, 
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        marginBottom: 16, 
    },
    editableLabel: {
        fontSize: 13,
        fontWeight: "400",
        color: "#8E8E8E",
        width: 85,
        marginRight: -20,
    },
    editableValue: {
        flex: 1,
        fontSize: 15,
        fontWeight: "600",
        color: "#333333",
        paddingVertical: 0,
        paddingHorizontal: 0,
    }
});