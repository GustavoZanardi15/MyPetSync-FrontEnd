import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormInput({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    autoCapitalize = "sentences",
    required = false,
    onEndEditing,
    editable = true,
}) {
    return (
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
                {label}
                {required && <Text style={{ color: "red" }}> *</Text>}
            </Text>
            <TextInput
                style={[styles.input, !editable && { backgroundColor: "#EEEEEE" }]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#A9A9A9"
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                onEndEditing={onEndEditing}
                editable={editable}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputGroup: { marginBottom: 16 },
    inputLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: "#2F8B88",
    },
});
