import React from "react";
import { ScrollView, Pressable, Text, StyleSheet } from "react-native";

export default function SelectDay({ dias, dataSelecionada, setDataSelecionada, scrollRef }) {
  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.diaContainer}
    >
      {dias.map((item) => (
        <Pressable
          key={item.dia}
          style={[styles.diaBox, dataSelecionada === item.dia && styles.diaSelecionado]}
          onPress={() => setDataSelecionada(item.dia)}
        >
          <Text style={[styles.diaSemana, dataSelecionada === item.dia && styles.textoSelecionado]}>
            {item.diaSemana}
          </Text>
          <Text style={[styles.numeroDia, dataSelecionada === item.dia && styles.textoSelecionado]}>
            {item.dia}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  diaContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  diaBox: {
    backgroundColor: "#E9ECEF",
    borderRadius: 16,
    width: 48,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  diaSelecionado: {
    backgroundColor: "#A5D8FF",
  },
  diaSemana: {
    fontSize: 13,
    color: "#8E8E8E",
    fontWeight: "bold",
  },
  numeroDia: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7A7A7A",
  },
  textoSelecionado: {
    color: "#FFF",
  },
});
