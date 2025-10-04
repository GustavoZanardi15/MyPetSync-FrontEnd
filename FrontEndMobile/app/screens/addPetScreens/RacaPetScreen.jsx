import React from "react";
import RacaPetHeader from "../../../components/addPet/racaPet/RacaPetHeader";
import RacaPetForm from "../../../components/addPet/racaPet/RacaPetForm";
import BottomActions from "../../../components/addPet/racaPet/BottomActions";
import { StyleSheet, Text, View } from "react-native";


export default function RacaPetScreen() {

    return (
        <View style={styles.container}>
            <View>
                <RacaPetHeader />
                <Text style={styles.title}> Qual a raça do seu pet? </Text>
                <RacaPetForm />
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
        marginBottom: 30,
    }
});    
