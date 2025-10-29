import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"; 
import { Ionicons } from "@expo/vector-icons";

export default function LoginForm({ email, setEmail, senha, setSenha, router }) { 
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            
            <TextInput 
                style={styles.input} 
                placeholder="E-mail" 
                value={email} 
                onChangeText={setEmail} 
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <View style={styles.passwordInputWrapper}> 
                <TextInput
                   style={[styles.input, styles.passwordInput]}
                   placeholder="Senha"
                   secureTextEntry={!showPassword} 
                   value={senha}
                   onChangeText={setSenha}
                   placeholderTextColor="#A0A0A0"
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#2F8B88"/>
                </Pressable>
            </View>

            <Pressable style={styles.forgotContainer} 
                onPress={() => { router.push("/screens/telaInicialScreens/RecuperarSenhaScreen") }}>
                <Text style={styles.forgot}>Esqueceu a senha?</Text>
            </Pressable>
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
        color: "#2F8B88",
        fontSize: 15,
        fontWeight: "bold",
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
        height: 56,
        paddingRight: 50, 
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 327,
        borderRadius: 16,
        backgroundColor: '#fff',
        height: 56,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3
    },
    passwordInput: {
        flex: 1, 
        height: '100%',
        paddingRight: 15 
    },
    iconContainer: {
        paddingHorizontal: 15,
        height: '100%', 
        justifyContent: 'center'
    },
    forgotContainer: {
        width: '100%',
        maxWidth: 327,
        alignItems: 'flex-end',
        marginBottom: 20
    },
    forgot: {
        color: "#89CFF0",
        textAlign: "right",
        fontSize: 14
    }
});