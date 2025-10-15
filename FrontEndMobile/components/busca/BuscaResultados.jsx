import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";

export default function BuscaResultados({ filteredItems, searchText, onItemPress }) {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{searchText ? "" : "Recentes"}</Text>
            <View style={styles.recentList}>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <Pressable key={index} onPress={() => onItemPress(item)} style={styles.recentItem}>
                            <Text style={styles.recentItemText}>{item}</Text>
                            {index < filteredItems.length - 1 && <View style={styles.separator} />}
                        </Pressable>
                    ))
                ) : (
                    <View style={styles.noResults}>
                        <Image
                            source={require("../../assets/images/busca/ServicoNaoEncontrado.png")}
                            style={styles.noResultsImage}
                        />
                        <Text style={styles.noResultsText}>Nenhum resultado encontrado</Text>
                        <Text style={styles.noResultSubText}>para "{searchText}"</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 30
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "semibold",
        color: "#2F8B88",
        marginBottom: 10,
        left: 15
    },
    recentList: {
        backgroundColor: "#F9F9F9",
        borderRadius: 10,
        overflow: "hidden"
    },
    recentItem: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        justifyContent: "center"
    },
    recentItemText: {
        fontSize: 15,
        color: "#4B887C"
    },
    separator: {
        height: 1,
        backgroundColor: "#F0F0F0",
        position: "absolute",
        bottom: 0,
        left: 15,
        right: 15
    },
    noResults: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 150
    },
    noResultsImage: {
        width: 193,
        height: 204
    },
    noResultsText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 5,
        textAlign: "center"
    },
    noResultSubText: {
        fontSize: 18,
        fontWeight: "medium",
        color: "#2F8B88",
        textAlign: "center"
    },
});
