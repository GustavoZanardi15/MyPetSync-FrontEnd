import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, Platform, StatusBar, Pressable, ActivityIndicator} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";

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

  useEffect(() => {
    const loadInitialData = async () => {
        setLoading(true);
        let userId = null;

        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Token ausente");
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            
            const userRes = await api.get("/users/me");
            userId = userRes.data?.id;
            
            if (!userId) throw new Error("Usuário inválido retornado do backend");
            setCurrentUserId(userId);
        } catch (err) {
            console.error("Erro ao buscar usuário/token:", err.response?.data || err.message);
            Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
            router.replace("/screens/telaInicialScreens/LoginScreen");
            setLoading(false);
            return; 
        }

        if (!appointmentId || !userId) {
            setLoading(false);
            return;
        }

        try {
            const apptRes = await api.get(`/appointments/${appointmentId}`);
            const appointmentData = apptRes.data;
            setAppointment(appointmentData);

            const reviewParams = { 
                author: userId, 
                limit: 1,
                appointment: appointmentId
            };

            const reviewRes = await api.get("/reviews", { params: reviewParams });
            
            const isAlreadyRated = reviewRes.data?.total > 0;
            setIsRated(isAlreadyRated);
            
            if (isAlreadyRated && reviewRes.data?.items.length > 0) {
                const existingReview = reviewRes.data.items[0];
                setRating(existingReview.rating);
                setComment(existingReview.comment || "");
            }

        } catch (err) {
            console.error("Erro ao carregar dados:", err.response?.data || err.message);
            Alert.alert("Erro", "Falha ao carregar agendamento ou avaliação.");
            router.back();
        } finally {
            setLoading(false);
        }
    };

    loadInitialData();
  }, [appointmentId]);


  const handleSubmit = async () => {
    if (!appointment) return Alert.alert("Erro", "Dados do agendamento ausentes.");
    if (rating === 0) return Alert.alert("Erro", "Selecione uma nota de 1 a 5.");
    if (isRated) return Alert.alert("Aviso", "Este agendamento já foi avaliado.");

    setSubmitting(true);
    try {
      const payload = {
        rating,
        comment: comment.trim() || undefined,
        provider: appointment.provider?._id,
        appointment: appointmentId,
      };

      await api.post("/reviews", payload);
      
      Alert.alert("Sucesso", "Avaliação enviada!");
      setIsRated(true); 
      router.back();
    } catch (err) {
      console.error("=== ERRO COMPLETO ===");
      console.error("Erro status:", err.response?.status);
      console.error("Erro data:", err.response?.data);
      
      let errorMessage = "Falha ao enviar avaliação.";
      
      if (err.response?.status === 409) {
        errorMessage = "Você já avaliou este agendamento.";
        setIsRated(true); 
      } else if (err.response?.status === 400) {
        errorMessage = "Dados inválidos. Verifique as informações.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      Alert.alert("Erro", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Pressable
          key={i}
          onPress={() => handleRating(i)}
          style={styles.starIcon}
          disabled={isRated || submitting}
        >
          <Ionicons name={i <= rating ? "star" : "star-outline"} size={40} color={i <= rating ? "#FFC700" : "#C0C0C0"} />
        </Pressable>
      );
    }
    return stars;
  };

  if (loading) return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator size="large" color="#2F8B88" />
      <Text style={{ textAlign: "center", marginTop: 10 }}>Carregando dados do agendamento...</Text>
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
        style={[styles.submitButton, (isRated || submitting || rating === 0) && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isRated || submitting || rating === 0}
      >
        <Text style={styles.submitButtonText}>
          {isRated ? "Já Avaliado" : submitting ? "Enviando..." : "Enviar Avaliação"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const headerStyles = StyleSheet.create({
  headerContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 20 
  },
  backButton: { 
    paddingRight: 15, 
    paddingVertical: 5 
  },
});

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9F9F9", 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60, 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "600", 
    color: "#2F8B88", 
    textAlign: "center", 
    marginBottom: 25 
  },
  starsContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginBottom: 25 
  },
  starIcon: { 
    marginHorizontal: 5 
  },
  textArea: { 
    backgroundColor: "#FFFFFF", 
    borderRadius: 10, 
    padding: 15, 
    fontSize: 14, 
    minHeight: 120, 
    textAlignVertical: "top", 
    borderColor: "#DDD", 
    borderWidth: 1, 
    marginBottom: 30 
  },
  submitButton: { 
    backgroundColor: "#2F8B88", 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center", 
    marginHorizontal: 20, 
    marginBottom: 40 
  },
  submitButtonDisabled: { 
    backgroundColor: "#A8E6CF" 
  },
  submitButtonText: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});