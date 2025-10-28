import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, StatusBar, Platform, Image } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function LembretesScreen() {
  const [dataAtual, setDataAtual] = useState(new Date());

  const gerarDiasDoMes = (dataBase) => {
    const ano = dataBase.getFullYear();
    const mes = dataBase.getMonth();
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

  const [dias, setDias] = useState(gerarDiasDoMes(dataAtual));
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().getDate().toString().padStart(2, "0")
  );
  const scrollRef = useRef(null);

  const mesAtualTexto = dataAtual.toLocaleString("pt-BR", {
    month: "long",
  });

  const mudarMes = (direcao) => {
    const novaData = new Date(dataAtual);
    novaData.setMonth(dataAtual.getMonth() + direcao);
    setDataAtual(novaData);
    setDias(gerarDiasDoMes(novaData));
    setDataSelecionada("01");
  };

  useEffect(() => {
    const index = dias.findIndex((d) => d.dia === dataSelecionada);
    if (scrollRef.current && index >= 0) {
      const itemWidth = 62;
      scrollRef.current.scrollTo({
        x: index * itemWidth - 100,
        animated: false,
      });
    }
  }, [dias, dataSelecionada]);

  const lembretesPorDia = {
    ["27"]: [
      {
        id: 1,
        hora: "09h",
        titulo: "Diego Cruz",
        descricao: "PetWalker - Passeio",
        cor: "#2F8B88",
        horaDetalhe: "09:20",
      },
      {
        id: 2,
        hora: "14h",
        titulo: "Vacina Anual",
        descricao: "Clínica Pet Feliz",
        cor: "#B39DDB",
        horaDetalhe: "14:20 - 14:50",
      },
    ],
  };

  const lembretes = lembretesPorDia[dataSelecionada] || [];
  const lembretesAgrupados = lembretes.reduce((acc, l) => {
    if (!acc[l.hora]) acc[l.hora] = [];
    acc[l.hora].push(l);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F9FAFB"
        translucent
      />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2F8B88" />
        </Pressable>

        <Text style={styles.title}>Lembretes</Text>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/screens/lembreteScreens/AddLembreteScreen")}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#2F8B88" />
        </Pressable>
      </View>

      <View style={styles.monthNav}>
        <Pressable onPress={() => mudarMes(-1)} style={styles.arrowBtn}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color="#2F8B88"
          />
        </Pressable>
        <Text style={styles.monthText}>
          {mesAtualTexto.charAt(0).toUpperCase() + mesAtualTexto.slice(1)}{" "}
          {dataAtual.getFullYear()}
        </Text>
        <Pressable onPress={() => mudarMes(1)} style={styles.arrowBtn}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#2F8B88"
          />
        </Pressable>
      </View>

      <Text style={styles.subtitle}>
        Hoje {dataSelecionada} de {mesAtualTexto} de {dataAtual.getFullYear()}
      </Text>

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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.entries(lembretesAgrupados).length > 0 ? (
          Object.entries(lembretesAgrupados).map(
            ([horaPrincipal, lembretesDoGrupo]) => (
              <View key={horaPrincipal} style={styles.horaGroup}>
                <Text style={styles.horaPrincipal}>{horaPrincipal}</Text>

                {lembretesDoGrupo.map((l) => (
                  <View key={l.id} style={styles.card}>
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
                          <Text style={styles.horaTexto}>{l.horaDetalhe}</Text>
                        </View>
                        <MaterialCommunityIcons
                          name="bell-outline"
                          size={18}
                          color="#2F8B88"
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )
          )
        ) : (
          <Text style={styles.semLembretes}>Nenhum lembrete neste dia</Text>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable onPress={() => router.push("/screens/lembreteScreens/LembreteScreen")}>
          <Image source={require("../../../assets/images/home/NavBarCalendarSelect.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/screens/servicoScreens/ServicoPetScreen")}>
          <Image source={require("../../../assets/images/home/NavBarServico.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/screens/homeScreens/HomeScreen")}>
          <Image source={require("../../../assets/images/home/NavBarHome.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/screens/perfilPetScreens/PerfilPetScreen")}>
          <Image source={require("../../../assets/images/home/NavBarPet.png")} />
        </Pressable>
        <Pressable>
          <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 55,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: "center",
    flex: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  monthNav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  arrowBtn: {
    padding: 5,
  },
  monthText: {
    fontSize: 16,
    color: "#2F8B88",
    fontWeight: "600",
    marginHorizontal: 8,
    textTransform: "capitalize",
  },
  subtitle: {
    textAlign: "center",
    color: "#7A7A7A",
    fontSize: 13,
    marginTop: 4,
  },
  diaContainer: { paddingVertical: 10, paddingHorizontal: 16 },
  diaBox: {
    backgroundColor: "#E9ECEF",
    borderRadius: 16,
    width: 48,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  diaSelecionado: { backgroundColor: "#A5D8FF" },
  diaSemana: { fontSize: 13, color: "#7A7A7A", fontWeight: "bold" },
  numeroDia: { fontSize: 18, fontWeight: "bold", color: "#7A7A7A" },
  textoSelecionado: { color: "#FFF" },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 90,
    paddingTop: 10,
  },
  horaGroup: { marginBottom: 20 },
  horaPrincipal: {
    color: "#7A7A7A",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 10,
  },
  barra: {
    width: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  info: { flex: 1 },
  titulo: { fontWeight: "bold", fontSize: 15, color: "#2F8B88" },
  descricao: { color: "#7A7A7A", fontSize: 13, marginBottom: 8 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horaWrapper: { flexDirection: "row", alignItems: "center", gap: 4 },
  horaTexto: { color: "#2F8B88", fontSize: 13 },
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
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});