import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Card({ tutor, onPress }) {
    const initial = tutor.nome ? tutor.nome[0].toUpperCase() : "?";

    return (
        <Pressable style={styles.card} onPress={onPress}>
            
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initial}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.nome} numberOfLines={1}>
                    {tutor.nome}
                </Text>

                {tutor.ultimoServico ? (
                    <Text style={styles.ultimaMensagem} numberOfLines={1}>
                        {tutor.ultimoServico}
                    </Text>
                ) : null}
            </View>

            <Text style={styles.horario}>
                {tutor.horario || tutor.hora || "--:--"}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "94%",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        alignSelf: "center",
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#3FA796",
        justifyContent: "center",
        alignItems: "center",
    },

    avatarText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    content: {
        flex: 1,
        marginLeft: 14,
    },

    nome: {
        fontSize: 16,
        color: "#1C1C1C",
        fontWeight: "600",
        marginBottom: 3,
    },

    ultimaMensagem: {
        fontSize: 14,
        color: "#6E6E6E",
    },

    horario: {
        fontSize: 12,
        color: "#808080",
        marginLeft: 10,
    },
});
