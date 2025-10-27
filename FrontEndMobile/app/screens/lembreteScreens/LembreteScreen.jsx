import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, StatusBar, Platform, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function LembretesScreen() {
  const gerarDiasDoMes = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

    return Array.from({ length: ultimoDia }, (_, i) => {
      const data = new Date(ano, mes, i + 1);
      return {
        diaSemana: diasSemana[data.getDay()],
        dia: (i + 1).toString().padStart(2, "0"),
      };
    });
  };

  const [dias, setDias] = useState(gerarDiasDoMes());
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().getDate().toString().padStart(2, "0")
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    const index = dias.findIndex((d) => d.dia === dataSelecionada);
    if (scrollRef.current && index >= 0) {
      const itemWidth = 62;
      scrollRef.current.scrollTo({ x: index * itemWidth, animated: false });
    }
  }, [dias]);

  const lembretesPorDia = {
    "24": [
      {
        id: 1,
        hora: "09:20",
        titulo: "Diego Cruz",
        descricao: "PetWalker - Passeio",
        cor: "#2F8B88",
      },
      {
        id: 2,
        hora: "14:20 - 14:50",
        titulo: "xxx",
        descricao: "xx",
        cor: "#B39DDB",
      },
      {
        id: 3,
        hora: "20:30",
        titulo: "xxx",
        descricao: "xxx",
        cor: "#A5D6A7",
      },
      {
        id: 4,
        hora: "21:00 - 22:00",
        titulo: "xxxxx",
        descricao: "xxxx",
        cor: "#FFE082",
      },
    ],
    "25": [
      {
        id: 5,
        hora: "10:00 - 10:30",
        titulo: "Juliana Souza",
        descricao: "Consulta - Checkup",
        cor: "#81D4FA",
      },
      {
        id: 6,
        hora: "18:00",
        titulo: "Carlos Lima",
        descricao: "Retorno - Vacinação",
        cor: "#FFAB91",
      },
    ],
  };

  const lembretes = lembretesPorDia[dataSelecionada] || [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" translucent />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Lembretes</Text>
          <Text style={styles.subtitle}>
            Hoje {dataSelecionada} de {new Date().toLocaleString("pt-BR", { month: "long" })} de{" "}
            {new Date().getFullYear()}
          </Text>
        </View>
        <Pressable style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={24} color="#2F8B88" />
        </Pressable>
      </View>

      {/* Seletor de datas */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.diaContainer}
      >
        {dias.map((item) => (
          <Pressable
            key={item.dia}
            style={[
              styles.diaBox,
              dataSelecionada === item.dia && styles.diaSelecionado,
            ]}
            onPress={() => setDataSelecionada(item.dia)}
          >
            <Text
              style={[
                styles.diaSemana,
                dataSelecionada === item.dia && styles.textoSelecionado,
              ]}
            >
              {item.diaSemana}
            </Text>
            <Text
              style={[
                styles.numeroDia,
                dataSelecionada === item.dia && styles.textoSelecionado,
              ]}
            >
              {item.dia}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Lista de lembretes */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {lembretes.length > 0 ? (
          lembretes.map((l) => (
            <View key={l.id} style={styles.cardWrapper}>
              <Text style={styles.hora}>{l.hora}</Text>
              <View style={styles.card}>
                <View style={[styles.barra, { backgroundColor: l.cor }]} />
                <View style={styles.info}>
                  <Text style={styles.titulo}>{l.titulo}</Text>
                  <Text style={styles.descricao}>{l.descricao}</Text>

                  <View style={styles.footer}>
                    <View style={styles.horaWrapper}>
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={16}
                        color="#2F8B88"
                      />
                      <Text style={styles.horaTexto}>{l.hora}</Text>
                    </View>
                    <MaterialCommunityIcons
                      name="bell-outline"
                      size={18}
                      color="#2F8B88"
                    />
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.semLembretes}>Nenhum lembrete neste dia</Text>
        )}
      </ScrollView>

      {/* Navegação inferior */}
      <View style={styles.bottomNav}>
        <Pressable
          onPress={() => router.push("/screens/lembreteScreens/LembreteScreen")}
        >
          <Image
            source={require("../../../assets/images/home/NavBarCalendarSelect.png")}
          />
        </Pressable>

        <Pressable
          onPress={() => router.push("/screens/servicoScreens/ServicoPetScreen")}
        >
          <Image
            source={require("../../../assets/images/home/NavBarServico.png")}
          />
        </Pressable>

        <Pressable onPress={() => router.push("/screens/homeScreens/HomeScreen")}>
          <Image
            source={require("../../../assets/images/home/NavBarHome.png")}
          />
        </Pressable>

        <Pressable
          onPress={() => router.push("/screens/perfilPetScreens/PerfilPetScreen")}
        >
          <Image
            source={require("../../../assets/images/home/NavBarPet.png")}
          />
        </Pressable>

        <Pressable>
          <Image
            source={require("../../../assets/images/home/NavBarPerfil.png")}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88",
  },
  subtitle: {
    color: "#7A7A7A",
    fontSize: 13,
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#2F8B88",
    borderRadius: 30,
    padding: 4,
  },
  diaContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  diaBox: {
    backgroundColor: "#E9ECEF",
    borderRadius: 25,
    width: 50,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  diaSelecionado: {
    backgroundColor: "#89CFF0",
  },
  diaSemana: {
    fontSize: 13,
    color: "#7A7A7A",
  },
  numeroDia: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7A7A7A",
  },
  textoSelecionado: {
    color: "#FFF",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  hora: {
    color: "#7A7A7A",
    fontSize: 13,
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  barra: {
    width: 4,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2F8B88",
  },
  descricao: {
    color: "#7A7A7A",
    fontSize: 13,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horaWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  horaTexto: {
    color: "#2F8B88",
    fontSize: 13,
  },
  semLembretes: {
    textAlign: "center",
    color: "#7A7A7A",
    marginTop: 30,
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 0.3,
    borderColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
