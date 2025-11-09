import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function EnderecoHeader() {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Pressable
                onPress={() =>
                (router.canGoBack()
                    ? router.back()
                    : router.push("/screens/perfilTutorScreens/PerfilTutorScreen"))
                }
                style={styles.backBtn}
            >
                <MaterialCommunityIcons name="chevron-left" size={24} color="#2F8B88" />
            </Pressable>
            <Text style={styles.headerTitle}>Endereços</Text>
            <View style={{ width: 24 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 24,
        marginVertical: 16,
    },
    backBtn: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2F8B88"
    }
}); 