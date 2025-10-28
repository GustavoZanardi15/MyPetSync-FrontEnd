import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Platform, ScrollView } from "react-native";
import LembretesHeader from "../../../components/lembrete/LembreteScreen/LembreteHeader";
import SelectMonth from "../../../components/lembrete/LembreteScreen/SelectMonth";
import SelectDay from "../../../components/lembrete/LembreteScreen/SelectDay";
import LembretesList from "../../../components/lembrete/LembreteScreen/LembreteList";
import BottomNav from "../../../components/lembrete/LembreteScreen/BottomNav";

export default function LembretesScreen() {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().getDate().toString().padStart(2, "0")
  );
  const scrollRef = useRef(null);

  const gerarDiasDoMes = (dataBase) => {
    const ano = dataBase.getFullYear();
    const mes = dataBase.getMonth();
    const ultimoDia = new Date(ano,  mes + 1, 0).getDate();
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
      {
        id: 3,
        hora: "11h",
        titulo: "Banho e Tosa",
        descricao: "PetShop Estrela",
        cor: "#FFD700",
        horaDetalhe: "11:00 - 11:30",
      },
      {
        id: 4,
        hora: "16h",
        titulo: "Consulta Veterinária",
        descricao: "Clínica Animal Care",
        cor: "#FF7F50",
        horaDetalhe: "16:15 - 16:45",
      },
      {
        id: 5,
        hora: "18h",
        titulo: "Passeio Noturno",
        descricao: "Parque Central",
        cor: "#87CEEB",
        horaDetalhe: "18:00 - 18:30",
      },
      {
        id: 6,
        hora: "20h",
        titulo: "Medicação",
        descricao: "Dar comprimido do Rex",
        cor: "#90EE90",
        horaDetalhe: "20:10",
      },
    ],
  };

  const lembretes = lembretesPorDia[dataSelecionada] || [];

   return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" translucent />

      <LembretesHeader />
      <SelectMonth dataAtual={dataAtual} mudarMes={mudarMes} />

      <Text style={styles.subtitle}>
        Hoje {dataSelecionada} de{" "}
        {dataAtual.toLocaleString("pt-BR", { month: "long" })} de{" "}
        {dataAtual.getFullYear()}
      </Text>

      <View style={styles.fixedDaysContainer}>
        <SelectDay
          dias={dias}
          dataSelecionada={dataSelecionada}
          setDataSelecionada={setDataSelecionada}
          scrollRef={scrollRef}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
>
        <View style={{ marginTop: 15 }}>
          <LembretesList lembretes={lembretes} />
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 55,
  },
  subtitle: {
    textAlign: "center",
    color: "#8E8E8E",
    fontSize: 11,
    marginTop: 4,
  },
  fixedDaysContainer: {
    backgroundColor: "#F9F9F9",
    paddingVertical: 10,
    zIndex: 10,
    elevation: 3,
  },
  scrollContainer: {
    paddingBottom: 120,
  }
});
