import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";
import PerfilTutorHeader from "../../../components/tutor/perfilTutor/PerfilTutorHeader";
import InfoTutorCard from "../../../components/tutor/perfilTutor/InfoTutorCard";
import OpcoesPerfilCard from "../../../components/tutor/perfilTutor/OpcoesPerfilCard";
import BottomNav from "../../../components/tutor/BottomNav";

export default function PerfilTutorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken"); 
        if (!token) {
          router.replace("/screens/telaInicialScreens/LoginScreen");
          return;
        }

        if (params.updatedUser) {
          setUser(JSON.parse(params.updatedUser));
        } else {
          const response = await api.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.log("Erro ao buscar usuário:", error);
        router.replace("/screens/telaInicialScreens/LoginScreen");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.updatedUser]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        <PerfilTutorHeader />
        {user && (
          <InfoTutorCard nome={user.nome} email={user.email} telefone={user.telefone} />
        )}
        <OpcoesPerfilCard
          onEndereco={() => router.push("/screens/perfilTutorScreens/EnderecoScreens/EnderecoScreen")}
          onServicos={() => router.push("/screens/perfilTutorScreens/HistoricoServicoScreen")} 
          onLembretes={() => router.push("/screens/lembreteScreens/LembreteScreen")}
          onLogout={async () => { 
            await AsyncStorage.removeItem("userToken");
            router.replace("/screens/telaInicialScreens/LoginScreen");
          }}
        />
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {  
    flex: 1,  
    backgroundColor: "#F8FAF9"  
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 60 
  }
});
