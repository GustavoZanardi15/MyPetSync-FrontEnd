import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, Pressable, Platform, StatusBar, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import api from "../../../src/service/api"; 
import EditInfo from "../../../components/pet/editarPet/EditInfo";
import EditPetHeader from "../../../components/pet/editarPet/EditPetHeader";
import EditPetImage from "../../../components/pet/editarPet/EditPetImage";
import BottomNav from "../../../components/pet/editarPet/BottomNav";


const createUpdateDto = (data) => {
    const castrado = data.neutered?.toLowerCase() === "sim";

    let condicoes_especiais = [];
    if (data.specialCondition) {
        condicoes_especiais = data.specialCondition
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);
    }
    
    const updateDto = {
        nome: data.name,
        raca: data.race,
        idade: data.age ? Number(data.age) : undefined, 
        peso: data.weight ? Number(data.weight) : undefined,
        castrado: castrado,
        condicoes_especiais: condicoes_especiais.length > 0 ? condicoes_especiais : undefined,
        foto: typeof data.profileImage === 'string' ? data.profileImage : undefined,
    };
    
    Object.keys(updateDto).forEach(key => {
        const value = updateDto[key];
        if (value === undefined || value === null || value === "" || (typeof value === 'number' && isNaN(value))) {
            delete updateDto[key];
        }
    });

    return updateDto;
};


export default function EditarPetScreen() {
    const { pet } = useLocalSearchParams();

    const selectedPet = pet ? JSON.parse(pet) : {};
    const petId = selectedPet.id; 

    const [petData, setPetData] = useState({
        profileImage: selectedPet.mainImage || require("../../../assets/images/home/DogHomePet1.png"),
        name: selectedPet.name || "",
        race: selectedPet.race || "",
        age: selectedPet.age || "",
        weight: selectedPet.weight || "",
        neutered: selectedPet.neutered || "Não", 
        specialCondition: selectedPet.specialCondition || "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = (field, value) => {
        setPetData({ ...petData, [field]: value });
    };

    const handleImageChange = (newImageUri) => {
        handleFieldChange("profileImage", newImageUri);
    };


    const handleUpdatePet = async () => {
        if (!petId) {
            Alert.alert("Erro", "ID do pet não encontrado para atualização.");
            return;
        }
        
        setIsLoading(true);
        const updateDto = createUpdateDto(petData);

        try {
            const token = await AsyncStorage.getItem("userToken");
            
            if (!token) {
                Alert.alert("Erro de Autenticação", "Usuário não autenticado. Faça login novamente.");
                setIsLoading(false);
                return;
            }

            const response = await api.put(`/pets/${petId}`, updateDto, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            
            const updatedPetFromApi = response.data;
            const finalUpdatedPet = {
                ...selectedPet, 
                ...updatedPetFromApi, 
                id: petId,
                name: updatedPetFromApi.nome || selectedPet.name,
                age: updatedPetFromApi.idade ? String(updatedPetFromApi.idade) : selectedPet.age,
                race: updatedPetFromApi.raca || selectedPet.race,
                weight: updatedPetFromApi.peso ? String(updatedPetFromApi.peso) : selectedPet.weight,
                neutered: updatedPetFromApi.castrado ? "Sim" : "Não",
                specialCondition: Array.isArray(updatedPetFromApi.condicoes_especiais) 
                    ? updatedPetFromApi.condicoes_especiais.join(', ') 
                    : "",
                mainImage: updatedPetFromApi.foto || selectedPet.mainImage,
            };

            Alert.alert("Sucesso", "Dados do pet atualizados com sucesso!");

            router.push({
                pathname: "/screens/perfilPetScreens/PerfilPetScreen",
                params: { 
                    updatedPet: JSON.stringify(finalUpdatedPet) 
                },
            });

        } catch (error) {
            console.error("Erro ao atualizar pet:", error.response?.data || error);

            const errorMessage = error.response?.data?.message
                ? Array.isArray(error.response.data.message) 
                    ? error.response.data.message.join("\n")
                    : error.response.data.message
                : "Não foi possível salvar as alterações. Verifique sua conexão, as regras de validação ou tente novamente.";

            Alert.alert("Erro", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <View style={styles.fullScreen}>
            <EditPetHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: 140 }]}
            >
                <EditPetImage 
                    imageSource={petData.profileImage} 
                    onImageChange={handleImageChange} 
                /> 

                <View style={styles.fieldsWrapper}>
                    <EditInfo label="Nome:" initialValue={petData.name} onValueChange={(v) => handleFieldChange("name", v)} />
                    <EditInfo label="Raça:" initialValue={petData.race} onValueChange={(v) => handleFieldChange("race", v)} />
                    <EditInfo label="Idade:" initialValue={petData.age} onValueChange={(v) => handleFieldChange("age", v)} keyboardType="numeric" />
                    <EditInfo label="Peso atual:" initialValue={petData.weight} onValueChange={(v) => handleFieldChange("weight", v)} keyboardType="numeric" />
                    <EditInfo label="Castrado:" initialValue={petData.neutered} onValueChange={(v) => handleFieldChange("neutered", v)} />
                    <EditInfo label="Condição especial:" initialValue={petData.specialCondition} onValueChange={(v) => handleFieldChange("specialCondition", v)} />
                </View>

                <Pressable
                    style={styles.saveButton}
                    onPress={handleUpdatePet}
                    disabled={isLoading}
                >
                    <Text style={styles.saveButtonText}>{isLoading ? "Salvando..." : "Salvar"}</Text>
                </Pressable>
            </ScrollView>

            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    fieldsWrapper: {
        marginTop: 10,
        gap: 12,
    },
    saveButton: {
        backgroundColor: "#2F8B88",
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 28,
        width: 200,
        alignSelf: "center",
        shadowColor: "#2F8B88",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4,
    },
    saveButtonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold",
    },
});