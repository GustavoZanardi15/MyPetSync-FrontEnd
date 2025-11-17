import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EditInfo({ label, initialValue, onValueChange }) {
    
    const keyboardType = label.includes("Idade") || label.includes("Peso") ? "numeric" : "default";
    const displayValue = (keyboardType === "numeric" && initialValue)
        ? String(initialValue).replace(/\D/g, '') 
        : initialValue; 

    const handleChange = (text) => {
        let numericText = text;
        if (keyboardType === "numeric") {
            numericText = text.replace(/\D/g, ''); 
        }
        onValueChange(numericText);
    };

    return (
        <View style={styles.editableContainer}>
            <Text style={styles.editableLabel}>{label}</Text>
            <TextInput
                style={[styles.editableValue]}
                value={displayValue}
                editable={true}
                onChangeText={handleChange} 
                placeholderTextColor="#A9A9A9"
                keyboardType={keyboardType}
            />
            <MaterialCommunityIcons name="pencil" size={18} color="#A9A9A9" style={styles.editIcon} />
        </View>
    );
}

const styles = StyleSheet.create({
    editableContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    editableLabel: {
        fontSize: 11,
        fontWeight: "regular",
        color: "#8E8E8E",
        width: 90,
    },
    editableValue: {
        flex: 1,
        fontSize: 15,
        fontWeight: "medium",
        color: "#2F8B88",
        textAlign: "left",
        paddingRight: 4,
    },
    editIcon: {
        marginLeft: 8
    },
});