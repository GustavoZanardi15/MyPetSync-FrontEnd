import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import IdadePetHeader from "../../../components/addPet/idadePet/IdadePetHeader";
import IdadePetForm from "../../../components/addPet/idadePet/IdadePetForm";
import BottomActions from "../../../components/addPet/idadePet/BottomActions";

export default function IdadePetScreen() {
    const [anos, setAnos] = useState(0);
    const [meses, setMeses] = useState(0);

    return (
        <View style={styles.container}>
            <View>
                <IdadePetHeader />
                <View style={styles.contentWrapper}>
                    <Text style={styles.title}>Quantos anos tem seu Pet?</Text>
                    <IdadePetForm anos={anos} setAnos={setAnos} meses={meses} setMeses={setMeses} />
                </View>
            </View>
            <BottomActions />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 20,
        paddingTop: 60,
        justifyContent: "space-between",
    },
    contentWrapper: {
        marginTop: 40,
        alignItems: "center",
        width: '100%', 
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2F8B88",
        textAlign: "center",
        marginBottom: 30,
    },
});
