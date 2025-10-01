import { router } from "expo-router";
import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function RecuperarSenhaForm({ telefone, setTelefone, onPress }) {
    return (
        <View style={styles.content}>
            
            <View style={styles.topContent}>
                <Text style={styles.text}>
                    {"Digite o número de telefone associado \n"}
                    {"à sua conta e enviaremos um código \n"}
                    {"para redefinir sua senha"}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Número de celular"
                    keyboardType="phone-pad"
                    value={telefone}
                    onChangeText={setTelefone}
                    placeholderTextColor="#A0A0A0"
                />
            </View>
            <Pressable style={styles.button} onPress={() => {router.push("/VerificacaoScreen")}}>
                <Text style={styles.buttonText}>Enviar</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: "center",
        paddingTop: 40, 
        width: "100%",
        justifyContent: "space-between", 
        paddingBottom: 20,
    },
    topContent: {
        alignItems: "center",
        width: "100%", 
    },
    text: {
        fontSize: 18,
        color: "#2F8B88",
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 24,
    },
    input: {
        width: "100%",
        height: 56,
        backgroundColor: "#fff",
        color: "#2F8B88", 
        borderRadius: 16,
        paddingHorizontal: 15,
        fontSize: 15,
        fontWeight: "bold",
        maxWidth: 327, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    button: {
        backgroundColor: "#2F8B88", 
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        width: 279,
        maxWidth: 327,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    buttonDisabled: {
        backgroundColor: "#A0A0A0", 
    },
    buttonText: {
        color: "#fff", 
        fontSize: 15,
        fontWeight: "bold"
    }
});