import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function CadastroForm({ nome, setNome, email, setEmail, celular, setCelular, senha, setSenha }) {
    return (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Celular"
                value={celular}
                onChangeText={setCelular}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
        maxWidth: 327,
        marginBottom: 24,
        gap: 20,
    },
    input: {
        color: "#808080",
        borderWidth: 0,
        borderRadius: 16,
        padding: 15,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
});