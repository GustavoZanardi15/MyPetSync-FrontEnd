import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const THEME_COLOR = "#2F8B88";
const MAX_WIDTH = 327; 

export default function BottomActions() {
    // Lógica de ação pode ser passada via props ou definida aqui
    const handleLogin = () => console.log('Login Pressed');
    
    return (
        // Contêiner que empurra o conteúdo para o fundo da tela (flex: 1)
        <View style={styles.bottomButtonsContainer}>
            <View style={styles.horizontalBottomRow}>
                
                {/* Botão Entrar */}
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                {/* Ícones Sociais */}
                <View style={styles.socialIconsGroup}>
                    {/* Apple Icon */}
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-apple" size={28} color={THEME_COLOR} />
                    </TouchableOpacity>

                    {/* Google Icon */}
                    <TouchableOpacity style={styles.socialButton}>
                        <Image 
                            source={require("../../assets/images/IconGoogle.png")} 
                            style={styles.logoGoogle} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // 4. Contêiner que usa o espaço restante
    bottomButtonsContainer: {
        flex: 1, 
        justifyContent: 'flex-end',
        width: '100%',
        maxWidth: MAX_WIDTH,
        paddingBottom: 20,
    },
    horizontalBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    socialIconsGroup: {
        flexDirection: 'row',
        gap: 16,
    },
    // 5. Estilos do Botão "Entrar"
    button: {
        backgroundColor: THEME_COLOR,
        padding: 10,
        height: 56,
        borderRadius: 12,
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 183,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
    // Estilos dos Botões Sociais
    socialButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    logoGoogle: {
        width: 28,
        height: 28,
    },
});