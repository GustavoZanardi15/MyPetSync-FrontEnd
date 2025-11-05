// src/screens/lembreteScreens/AddLembreteScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from "react-native";
import PetDropdown from "../../../components/lembrete/AddLembreteScreen/PetDropdown"; 
import TiposLembrete from "../../../components/lembrete/AddLembreteScreen/TiposLembretes"; 
import NovoLembreteCard from "../../../components/lembrete/AddLembreteScreen/NovoLembreteCard"; 
import BottomNav from "../../../components/lembrete/AddLembreteScreen/BottomNav"; 

const pets = [
  { name: "Theo", image: require("../../../assets/images/home/DogHomePet1.png") },
  { name: "Fred", image: require("../../../assets/images/home/DogHomePet2.png") },
  { name: "Luna", image: require("../../../assets/images/home/CatHomePet.png") }
];

const tiposLembrete = [
  { name: "Remédios", icon: "pill", iconColor: "#2F8B88", iconBg: "#A8E6CF" },
  { name: "Vacinas", icon: "needle", iconColor: "#2F8B88", iconBg: "#DFD4FB" },
  { name: "Exercícios", icon: "basketball", iconColor: "#2F8B88", iconBg: "#A8E6CF" },
  { name: "Água", icon: "cup-water", iconColor: "#2F8B88", iconBg: "#FFD97D" }
];

const handleSaveReminder = () => {
    console.log("Lembrete salvo:", { pet, reminderName, duration, time, quantity });
    navigation.goBack();
};


export default function AddLembreteScreen({ navigation }) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [reminderName, setReminderName] = useState('');
  const [time, setTime] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSaveReminder = () => {
    console.log("Lembrete salvo:", { selectedPet, selectedTipo, reminderName, time, quantity });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho */}
        <Text style={styles.header}>Adicionar Lembrete</Text>
        
        {/* Tipos de Lembrete */}
        <TiposLembrete tipos={tiposLembrete} selectedTipo={selectedTipo} setSelectedTipo={setSelectedTipo} />

        {/* Seleção do Pet */}
        <PetDropdown pets={pets} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />

        {/* Campo de Nome do Lembrete */}
        <Text style={styles.label}>Nome do Lembrete</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Dar remédio para Theo"
          value={reminderName}
          onChangeText={setReminderName}
        />

        {/* Campo de Horário */}
        <Text style={styles.label}>Horário</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 08:00"
          value={time}
          onChangeText={setTime}
        />

        {/* Quantidade */}
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>Quantidade</Text>
          <View style={styles.quantityControl}>
            <Button title="-" onPress={() => setQuantity(Math.max(1, quantity - 1))} />
            <Text style={styles.quantityText}>{quantity}</Text>
            <Button title="+" onPress={() => setQuantity(quantity + 1)} />
          </View>
        </View>

        {/* Card para Resumo do Lembrete */}
        <NovoLembreteCard reminder={{ reminderName, time, quantity }} />
      </ScrollView>

      {/* Navegação Inferior */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 55,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  label: {
    fontSize: 14,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  quantityContainer: {
    marginVertical: 20,
  },
  quantityControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});
