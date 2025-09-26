import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const THEME_COLOR = "#2F8B88";
const MAX_WIDTH = 327; 

export default function BottomActions() {
    const handleLogin = () => console.log('Login Pressed');
    
    return (
        <View style={styles.bottomButtonsContainer}>
            <View style={styles.horizontalBottomRow}>
                
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.socialIconsGroup}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-apple" size={28} color={THEME_COLOR} />
                    </TouchableOpacity>

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