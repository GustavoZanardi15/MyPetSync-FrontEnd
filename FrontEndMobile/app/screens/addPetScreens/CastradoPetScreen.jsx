import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CastradoPetHeader from "../../../components/addPet/castradoPet/CastradoPetHeader";
import CastradoPetForm from "../../../components/addPet/castradoPet/CastradoPetForm";
import BottomActions from "../../../components/addPet/castradoPet/BottomActions";

export default function CastradoPetScreen() {
    const [castrado, setCastrado] = useState(null);

    return (
        <View style={styles.container}>
            <View>
                <CastradoPetHeader />
                <Text style={styles.title}>Seu Pet é castrado?</Text>
                <CastradoPetForm castrado={castrado} setCastrado={setCastrado} />
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
        justifyContent: "space-between"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2F8B88",
        textAlign: "center",
        marginBottom: 40
    }
});
