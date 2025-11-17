import React, { useState } from "react";
import { Pressable, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";
import { useRouter } from "expo-router";

export default function DeletePetButton({ pet, onPetDeleted }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDeletePet = async () => {
        if (isLoading) return;

        if (!pet || !pet.id) {
            Alert.alert("Erro", "Nenhum pet selecionado para exclusão.");
            return;
        }

        console.log(`🟠 ACIONADO: Exclusão direta do pet ID: ${pet.id}`);

        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem("userToken");
            
            if (!token) {
                console.warn("❌ ERRO: Token de usuário 'userToken' não encontrado!");
                Alert.alert("Erro de Autenticação", "Sessão expirada. Faça login novamente.");
                router.replace('/screens/loginScreens/LoginScreen');
                return;
            }
            
            const deleteUrl = `/pets/${pet.id}`;
            console.log(`📡 ENVIANDO DELETE para: ${deleteUrl}`);
            
            await api.delete(deleteUrl, {
                 headers: { Authorization: `Bearer ${token}` },
            });
            
            console.log("✅ DELETE da API OK. Pet removido com sucesso!");
            Alert.alert("Sucesso", `${pet.name} foi removido com sucesso!`);

            if (onPetDeleted) {
                console.log("🟢 Chamando onPetDeleted para recarregar a tela.");
                onPetDeleted(); 
            }

        } catch (error) {
            console.error("❌ ERRO GRAVE no processo de deleção:", error.response?.data || error.message || error); 
            
            const errorMessage = error.response?.data?.message
                ? Array.isArray(error.response.data.message)
                    ? error.response.data.message.join("\n")
                    : error.response.data.message
                : "Não foi possível remover o pet. Verifique sua conexão ou tente novamente.";

            Alert.alert("Erro de Deleção", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Pressable
            style={[styles.deleteButton, isLoading && styles.deleteButtonDisabled]}
            onPress={handleDeletePet}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="#E57373" />
            ) : (
                <Text style={styles.deleteButtonText}>EXCLUIR PET</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: "#FF3B30",
        borderRadius: 30,
        paddingVertical: 12,
        width: 250,
        alignItems: "center",
        alignSelf: "center",
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 80, 
        borderWidth: 1,
        borderColor: "#E57373", 
    },
    deleteButtonDisabled: {
        opacity: 0.6,
    },
    deleteButtonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold",
    },
});