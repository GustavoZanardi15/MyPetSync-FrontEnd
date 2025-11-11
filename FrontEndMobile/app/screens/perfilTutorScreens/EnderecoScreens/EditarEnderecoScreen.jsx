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

    let original = {};
    if (params.endereco) {
        try {
            original = typeof params.endereco === "string" ? JSON.parse(params.endereco) : params.endereco;
        } catch (e) {
            console.warn("Não foi possível parsear params.endereco:", e);
            original = {};
        }
    }

    const addressId = params.id ?? original._id ?? original.id ?? null;
    const initialZip = params.zip ?? original.zip ?? "";
    const initialLabel = params.label ?? original.label ?? "";
    const initialStreet = params.street ?? original.street ?? original.line ?? "";
    const initialCity = params.city ?? original.city ?? "";
    const initialState = params.state ?? original.state ?? "";

    const [cep, setCep] = useState(
        initialZip ? String(initialZip).replace(/(\d{5})(\d{3})/, "$1-$2") : ""
    );
    const [label, setLabel] = useState(initialLabel);
    const [street, setStreet] = useState(initialStreet);
    const [city, setCity] = useState(initialCity);
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const buscarCEP = async () => {
        const cepLimpo = cep.replace(/[^0-9]/g, "");
        if (cepLimpo.length !== 8) return;

        setIsLoading(true);
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await res.json();
            if (data.erro) {
                Alert.alert("Erro", "CEP não encontrado.");
            } else {
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

    const findAddressIndex = (addresses, originalAddr) => {
        if (!Array.isArray(addresses) || addresses.length === 0) return -1;

        const byId = addresses.findIndex(
            (a) =>
                (a._id && originalAddr._id && String(a._id) === String(originalAddr._id)) ||
                (a.id && originalAddr.id && String(a.id) === String(originalAddr.id))
        );
        if (byId !== -1) return byId;

        const byFields = addresses.findIndex((a) => {
            const aStreet = (a.street || a.line || "").toString().trim();
            const aZip = (a.zip || "").toString().replace(/[^0-9]/g, "");
            const aLabel = (a.label || "").toString().trim();

            const oStreet = (originalAddr.street || originalAddr.line || "").toString().trim();
            const oZip = (originalAddr.zip || "").toString().replace(/[^0-9]/g, "");
            const oLabel = (originalAddr.label || "").toString().trim();

            return (
                aStreet && oStreet && aStreet === oStreet &&
                aZip && oZip && aZip === oZip &&
                (aLabel === oLabel || !oLabel)
            );
        });
        if (byFields !== -1) return byFields;

        const oJson = JSON.stringify(originalAddr);
        const byJson = addresses.findIndex((a) => JSON.stringify(a) === oJson);
        return byJson;
    };

    const handleSalvarEdicao = async () => {
        if (!street || !city || !state || !cep) {
            return Alert.alert("Atenção", "Preencha todos os campos!");
        }

        setIsLoading(true);
        try {
            const token =
                (await AsyncStorage.getItem("access-token")) ||
                (await AsyncStorage.getItem("userToken"));

            if (!token) {
                Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
                router.replace("/screens/login/LoginScreen");
                setIsLoading(false);
                return;
            }

            const enderecoAtualizado = {
                label: label || "Casa",
                street,
                city,
                state,
                zip: cep.replace(/[^0-9]/g, ""),
            };

            const tutorResp = await api.get("/tutors/mine", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const tutor = tutorResp.data;
            const addresses = Array.isArray(tutor.addresses) ? tutor.addresses : [];

            const idx = findAddressIndex(addresses, original);
            if (idx === -1) {
                const maybeIndex = typeof params.index !== "undefined" ? Number(params.index) : -1;
                if (!isNaN(maybeIndex) && maybeIndex >= 0 && maybeIndex < addresses.length) {
                    addresses[maybeIndex] = { ...addresses[maybeIndex], ...enderecoAtualizado };
                } else {
                    Alert.alert(
                        "Erro",
                        "Não foi possível localizar o endereço para atualizar. Tente abrir a edição novamente."
                    );
                    setIsLoading(false);
                    return;
                }
            } else {
                addresses[idx] = { ...addresses[idx], ...enderecoAtualizado };
            }

            await api.put(
                "/tutors/mine",
                { addresses },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            Alert.alert("Sucesso", "Endereço atualizado com sucesso!");
            router.back();
        } catch (error) {
            console.error("Erro ao atualizar endereço:", error);
            Alert.alert(
                "Erro",
                error.response?.data?.message || "Falha ao atualizar endereço."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View
            style={[
                styles.screen,
                { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
            ]}
        >
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
                        onEndEditing={buscarCEP}
                    />
                    <FormInput label="Rua/Avenida" value={street} onChangeText={setStreet} />
                    <FormInput label="Cidade" value={city} onChangeText={setCity} />
                    <FormInput label="Estado" value={state} onChangeText={(t) => setState(t.toUpperCase())} placeholder="SP" />

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
        backgroundColor: "#F7F7F7",
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
        paddingVertical: 20,
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
        fontSize: 16,
    },
});
