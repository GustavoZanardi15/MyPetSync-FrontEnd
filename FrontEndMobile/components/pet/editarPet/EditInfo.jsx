import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EditInfo({ label, initialValue, onValueChange, iconName = "pencil" }) {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <View style={styles.editableContainer}>
            <Text style={styles.editableLabel}>{label}</Text>

            <TextInput
                style={[styles.editableValue, !isEditing && { color: "#2F8B88" }]}
                value={value ? value : "Não"} 
                editable={isEditing}
                onChangeText={(text) => {
                    setValue(text);
                    onValueChange?.(text);
                }}
                placeholderTextColor="#8E8E8E"
                keyboardType={label.includes("Peso") ? "numeric" : "default"}
            />

            <Pressable
                onPress={() => setIsEditing(!isEditing)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
                <MaterialCommunityIcons
                    name={isEditing ? "check" : iconName}
                    size={18}
                    color={isEditing ? "#2F8B88" : "#A9A9A9"}
                    style={styles.editIcon}
                />
            </Pressable>
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
    },
    editIcon: {
        marginLeft: 8
    },
});