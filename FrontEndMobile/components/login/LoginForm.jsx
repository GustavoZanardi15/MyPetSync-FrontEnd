import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const MAX_WIDTH = 327; 

export default function LoginForm({ email, setEmail, senha, setSenha }) {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                placeholder="E-mail" 
                value={email} 
                onChangeText={setEmail} 
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.forgotContainer}>
                <Text style={styles.forgot}>Esqueceu a senha?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    // Inputs
    input: {
        borderWidth: 0,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        width: '100%',
        maxWidth: MAX_WIDTH, 
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    // Link "Esqueceu a senha?"
    forgotContainer: {
        width: '100%',
        maxWidth: MAX_WIDTH,
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    forgot: {
        color: "#2F8B88",
        textAlign: "right",
        fontSize: 14,
    },
});