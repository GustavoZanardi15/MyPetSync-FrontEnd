import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Platform,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";

// Header simples
const Header = ({ router }) => (
  <View style={headerStyles.headerContainer}>
    <Pressable onPress={() => router.back()} style={headerStyles.backButton}>
      <Ionicons name="arrow-back-outline" size={24} color="#2F8B88" />
    </Pressable>
  </View>
);

export default function AvaliarScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const appointmentId = params?.appointmentId;

  const [currentUserId, setCurrentUserId] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isRated, setIsRated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleRating = (value) => setRating(value);

  // Carrega token e usuário
  useEffect(() => {
    const fetchAuthAndUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        console.log("DEBUG: userToken =", token);
        if (!token) throw new Error("Token ausente");

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const userRes = await api.get("/users/me");
        console.log("DEBUG: /users/me =", userRes.data);

        if (!userRes.data?.id) throw new Error("Usuário inválido retornado do backend");

        setCurrentUserId(userRes.data.id);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err.response?.data || err.message);
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
        router.replace("/screens/telaInicialScreens/LoginScreen");
      }
    };
    fetchAuthAndUser();
  }, []);

  // Carrega agendamento e verifica se já foi avaliado
  useEffect(() => {
    if (!appointmentId || !currentUserId) return;

    const loadAppointment = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/appointments/${appointmentId}`);
        const appointmentData = res.data;
        setAppointment(appointmentData);
        console.log("DEBUG: appointmentData =", appointmentData);

        const reviewParams = { author: currentUserId, limit: 1 };

        // Passa provider ou service se existir
        if (appointmentData.provider?._id) reviewParams.provider = appointmentData.provider._id;
        if (appointmentData.service?._id) reviewParams.service = appointmentData.service._id;

        console.log("DEBUG: reviewParams =", reviewParams);

        const reviewRes = await api.get("/reviews", { params: reviewParams });
        setIsRated(reviewRes.data?.total > 0);
      } catch (err) {
        console.error("Erro ao carregar agendamento:", err.response?.data || err.message);
        Alert.alert("Erro", "Falha ao carregar agendamento.");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    loadAppointment();
  }, [appointmentId, currentUserId]);

  // Envia avaliação
  const handleSubmit = async () => {
    if (!appointment) return Alert.alert("Erro", "Dados do agendamento ausentes.");
    if (rating === 0) return Alert.alert("Erro", "Selecione uma nota de 1 a 5.");
    if (isRated) return Alert.alert("Aviso", "Este agendamento já foi avaliado.");

    setSubmitting(true);
    try {
      const payload = {
        rating,
        comment,
        provider: appointment.provider?._id,
        service: appointment.service?._id,
      };

      console.log("DEBUG: Enviando review payload =", payload);

      await api.post("/reviews", payload);
      Alert.alert("Sucesso", "Avaliação enviada!");
      setIsRated(true);
      router.back();
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Falha ao enviar avaliação.";
      Alert.alert("Erro", message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRating(i)}
          style={styles.starIcon}
          disabled={isRated || submitting}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={40}
            color={i <= rating ? "#FFC700" : "#C0C0C0"}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  if (loading) return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2F8B88" />
      <Text style={{ textAlign: "center", marginTop: 10 }}>Carregando...</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header router={router} />
      <Text style={styles.title}>Avalie sua Experiência!</Text>

      {isRated && (
        <Text style={{ textAlign: "center", color: "red", marginBottom: 15, fontWeight: "bold" }}>
          Este agendamento já foi avaliado.
        </Text>
      )}

      <View style={styles.starsContainer}>{renderStars()}</View>

      <TextInput
        style={styles.textArea}
        placeholder="Adicione um comentário (Opcional)"
        multiline
        numberOfLines={4}
        maxLength={500}
        value={comment}
        onChangeText={setComment}
        editable={!isRated && !submitting}
      />

      <Pressable
        style={[styles.submitButton, (isRated || submitting) && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isRated || submitting}
      >
        <Text style={styles.submitButtonText}>
          {isRated ? "Já Avaliado" : submitting ? "Enviando..." : "Enviar Avaliação"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const headerStyles = StyleSheet.create({
  headerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { paddingRight: 15, paddingVertical: 5 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60, paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: "600", color: "#2F8B88", textAlign: "center", marginBottom: 25 },
  starsContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 25 },
  starIcon: { marginHorizontal: 5 },
  textArea: { backgroundColor: "#FFFFFF", borderRadius: 10, padding: 15, fontSize: 14, minHeight: 120, textAlignVertical: "top", borderColor: "#DDD", borderWidth: 1, marginBottom: 30 },
  submitButton: { backgroundColor: "#2F8B88", padding: 15, borderRadius: 10, alignItems: "center", marginHorizontal: 20, marginBottom: 40 },
  submitButtonDisabled: { backgroundColor: "#A8E6CF" },
  submitButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
