import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Platform, StatusBar, Pressable, Alert, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../../src/service/api";
import EditarEnderecoHeader from "../../../../components/tutor/editarEnderecoTutor/EditarEnderecoHeader";
import FormInput from "../../../../components/tutor/editarEnderecoTutor/FormInput";
import BottomNav from "../../../../components/tutor/editarEnderecoTutor/BottomNav";

export default function EditarEnderecoScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const addressId = params.id;

    const [cep, setCep] = useState(params.zip ? params.zip.replace(/(\d{5})(\d{3})/, "$1-$2") : "");
    const [label, setLabel] = useState(params.label || "");
    const [street, setStreet] = useState(params.street || "");
    const [city, setCity] = useState(params.city || "");
    const [state, setState] = useState(params.state || "");
    const [isLoading, setIsLoading] = useState(false);

    const buscarCEP = async () => {
        const cepLimpo = cep.replace(/[^0-9]/g, "");
        if (cepLimpo.length !== 8) return;

        setIsLoading(true);
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await res.json();
            if (data.erro) Alert.alert("Erro", "CEP não encontrado.");
            else {
                setStreet(data.logradouro || "");
                setCity(data.localidade || "");
                setState(data.uf || "");
            }
        } catch (err) {
            Alert.alert("Erro", "Falha ao buscar CEP.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSalvarEdicao = async () => {
        if (!street || !city || !state || !cep || !addressId)
            return Alert.alert("Atenção", "Preencha todos os campos!");

        setIsLoading(true);
        try {
            const token =
                (await AsyncStorage.getItem("access-token")) ||
                (await AsyncStorage.getItem("userToken"));

            const enderecoData = {
                label: label || "Casa",
                street,
                city,
                state,
                zip: cep.replace(/[^0-9]/g, ""),
            };

            await api.put(`/tutors/mine/addresses/${addressId}`, enderecoData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            Alert.alert("Sucesso", "Endereço atualizado com sucesso!");
            router.back();
        } catch (error) {
            Alert.alert("Erro", error.response?.data?.message || "Falha ao atualizar.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={[styles.screen, { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}>
            <View style={styles.contentContainer}>
                <EditarEnderecoHeader />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <FormInput label="Rótulo" value={label} onChangeText={setLabel} placeholder="Casa, Trabalho..." />
                    <FormInput
                        label="CEP"
                        value={cep}
                        onChangeText={(text) => {
                            let formatted = text.replace(/[^0-9]/g, "");
                            if (formatted.length > 5) formatted = formatted.slice(0, 5) + "-" + formatted.slice(5, 8);
                            setCep(formatted);
                        }}
                        placeholder="00000-000"
                        keyboardType="numeric"
                        required
                        onEndEditing={buscarCEP}
                    />
                    <FormInput label="Rua/Avenida" value={street} onChangeText={setStreet} required />
                    <FormInput label="Cidade" value={city} onChangeText={setCity} required />
                    <FormInput
                        label="Estado"
                        value={state}
                        onChangeText={(t) => setState(t.toUpperCase())}
                        placeholder="SP"
                        required
                    />

                    <Pressable style={[styles.saveButton]} onPress={handleSalvarEdicao} disabled={isLoading}>
                        {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveButtonText}>SALVAR</Text>}
                    </Pressable>
                    <View style={{ height: 120 }} />
                </ScrollView>
            </View>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F7F7F7"
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 30,
        elevation: 3,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    saveButton: {
        backgroundColor: "#2F8B88",
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 30,
        width: "80%",
        alignSelf: "center",
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16
    },
});
