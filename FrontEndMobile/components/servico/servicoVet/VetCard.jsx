import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function VetCard({ vet }) {
  const router = useRouter();

  const renderStars = (count) =>
    Array.from({ length: 5 }).map((_, starIndex) => {
      let iconName = "star-outline";
      if (starIndex + 1 <= Math.floor(count)) {
        iconName = "star";
      } else if (starIndex < count) {
        iconName = "star-half";
      }

      return (
        <Ionicons
          key={starIndex}
          name={iconName}
          size={14}
          color={starIndex < count ? "#FFD700" : "#C4C4C4"}
        />
      );
    });

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/screens/servicoScreens/ServicoVetDetalheScreen",
          params: {
            vetId: vet.id,
            vet: JSON.stringify(vet),
          },
        })
      }
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{vet.nome ? vet.nome[0] : ""}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.nome}>{vet.nome}</Text>
        <Text style={styles.especialidade}>{vet.especialidade}</Text>

        <View style={styles.rating}>
          {renderStars(vet.estrelas)}
          <Text style={styles.avaliacoes}> ({vet.avaliacoes})</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2F8B88",
  },
  especialidade: {
    color: "#8E8E8E",
    fontSize: 15,
    marginBottom: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  avaliacoes: {
    fontSize: 13,
    color: "#8E8E8E",
  }
});
