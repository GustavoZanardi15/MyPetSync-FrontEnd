import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import RecuperarSenhaHeader from "../components/recuperarSenha/RecuperarHeader"; 
import RecuperarSenhaForm from "../components/recuperarSenha/RecuperarForm"; 

export default function RecuperarSenhaScreen() {
    const [telefone, setTelefone] = useState("");

    return (
        <View style={styles.fullScreen}>
            <RecuperarSenhaHeader />
            <View style={styles.contentContainer}>
                <RecuperarSenhaForm 
                    telefone={telefone}
                    setTelefone={setTelefone}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});