import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated, PanResponder } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"; 

const TYPE_META = {
    home: { chip: "Casa", icon: "home-outline", color: "#00C853", textColor: "#00C853" },
    work: { chip: "Trabalho", icon: "briefcase-outline", color: "#2962FF", textColor: "#2962FF" },
    other: { chip: "Outro", icon: "map-marker-outline", color: "#FFD600", textColor: "#FFD600" },
};

const formatZip = (zip) => {
    if (!zip) return "";
    const cleaned = String(zip).replace(/[^0-9]/g, "");
    if (cleaned.length === 8) {
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
    }
    return zip;
};

const EnderecoItem = ({ item, onDelete, onEdit }) => { 
    const translateX = useRef(new Animated.Value(0)).current;

    const labelMap = {
        "casa": "home",
        "trabalho": "work",
    };

    const itemLabelLower = (item.label || "other").toLowerCase();
    const metaKey = labelMap[itemLabelLower] || "other";
    const meta = TYPE_META[metaKey] ?? TYPE_META.other;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dx) > 5 && Math.abs(gestureState.dy) < 10,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx < 0) translateX.setValue(Math.max(gestureState.dx, -80));
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -40) {
                    Animated.timing(translateX, {
                        toValue: -80,
                        duration: 150,
                        useNativeDriver: true,
                    }).start();
                } else {
                    Animated.timing(translateX, {
                        toValue: 0,
                        duration: 150,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <View style={styles.itemWrapper}>
            <View style={styles.deleteContainer}>
                <Pressable
                    onPress={() => onDelete(item._id ?? item.id)}
                    style={styles.deleteBtn}
                >
                    <MaterialCommunityIcons name="delete-outline" size={22} color="#FF3B30" />
                </Pressable>
            </View>

            <Animated.View style={[styles.item, { transform: [{ translateX }] }]} {...panResponder.panHandlers}>
                
                <Pressable
                    style={styles.editButton}
                    onPress={() => onEdit(item)}
                >
                    <Ionicons name="pencil" size={22} color="#2F8B88" />
                </Pressable>
                
                <View>
                    <View style={[styles.chip, { backgroundColor: `${meta.color}22`, borderColor: meta.color }]}>
                        <MaterialCommunityIcons name={meta.icon} size={16} color={meta.textColor} />
                        <Text style={[styles.chipText, { color: meta.textColor }]}>{meta.chip}</Text>
                    </View>

                    <Text style={styles.addressText}>
                        {item.street ? `${item.street}` : item.line}
                        {item.city ? `, ${item.city}` : ""}
                        {item.state ? ` - ${item.state}` : ""}
                        {item.zip ? ` , CEP: ${formatZip(item.zip)}` : ""}
                    </Text>
                </View>
            </Animated.View>
        </View>
    );
};

export default EnderecoItem;

const styles = StyleSheet.create({
    itemWrapper: { marginBottom: 12, position: "relative" },
    item: {
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 12,
        paddingRight: 50, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    chip: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 96,
        height: 36,
        borderWidth: 1,
        borderRadius: 18,
        paddingHorizontal: 8,
        gap: 6,
        marginBottom: 6,
    },
    chipText: {
        fontSize: 12,
        fontWeight: "bold",
    },
    addressText: {
        fontSize: 15,
        color: "#2F8B88"
    },
    deleteContainer: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteBtn: {
        backgroundColor: "#FFEAEA",
        borderRadius: 24,
        padding: 12,
        borderWidth: 1,
        borderColor: "#FF3B30"
    },
    editButton: {
        position: "absolute",
        top: 10,
        right: 12,
        padding: 8,
        zIndex: 10, 
    },
});