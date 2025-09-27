import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

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
        width: 327,
        alignItems: 'center',
        gap: 20
    },
    input: {
        color: "#808080",
        borderWidth: 0,
        borderRadius: 16,
        padding: 15,
        width: '100%',
        maxWidth: 327, 
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    forgotContainer: {
        width: '100%',
        maxWidth: 327,
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    forgot: {
        color: "#89CFF0",
        textAlign: "right",
        fontSize: 14,
    },
});