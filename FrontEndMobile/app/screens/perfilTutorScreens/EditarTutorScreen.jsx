import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Platform,
    StatusBar,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import api from "../../../src/service/api";
import EditarTutorHeader from "../../../components/tutor/editarTutor/EditarTutorHeader";
import EditarForm from "../../../components/tutor/editarTutor/EditarForm";
import SalvarButton from "../../../components/tutor/editarTutor/SalvarButton";

export default function EditarTutorScreen() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) return router.replace("/screens/telaInicialScreens/LoginScreen");

                const response = await api.get("/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setNome(response.data.nome);
                setEmail(response.data.email);
                setTelefone(response.data.telefone);
            } catch (error) {
                console.log("Erro ao buscar usuário:", error);
                Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleSalvar = async () => {
        if (saving) return;

        setSaving(true);
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Token não encontrado");

            const payload = { nome, email, telefone };
            const response = await api.patch("/users/me", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            router.replace({
                pathname: "/screens/perfilTutorScreens/PerfilTutorScreen",
                params: { updatedUser: JSON.stringify(response.data) },
            });

        } catch (error) {
            console.log("Erro ao atualizar perfil:", error);

            if (error.response?.status === 409) {
                Alert.alert("Erro", "Este e-mail já está em uso por outro usuário.");
            } else {
                Alert.alert("Erro", "Não foi possível atualizar o perfil.");
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <EditarTutorHeader />
            <ScrollView
                style={styles.form}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.formContent}
            >
                <EditarForm
                    label="Nome:"
                    value={nome}
                    onChange={setNome}
                    placeholder="Digite seu nome"
                />
                <EditarForm
                    label="E-mail:"
                    value={email}
                    onChange={setEmail}
                    keyboardType="email-address"
                    placeholder="Digite seu e-mail"
                />
                <EditarForm
                    label="Telefone:"
                    value={telefone}
                    onChange={setTelefone}
                    keyboardType="phone-pad"
                    placeholder="Digite seu telefone"
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <SalvarButton onPress={handleSalvar} loading={saving} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAF9",
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        flex: 1,
    },
    formContent: {
        paddingVertical: 40,
        gap: 16,
    },
    buttonContainer: {
        paddingVertical: 40,
    },
});