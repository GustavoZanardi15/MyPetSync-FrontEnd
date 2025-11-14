import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

// Traduz o status do agendamento, priorizando a flag isRated
const translateAppointmentStatus = (status, isRated) => {
  if (!status) return "";
  const lower = status.toLowerCase();

  // A prioridade é a flag 'isRated' para exibir 'Avaliado'
  // Isso resolve o problema de agendamentos concluídos que já foram avaliados.
  if (isRated) return "Avaliado";

  switch (lower) {
    case "scheduled":
      return "Agendado";
    case "confirmed":
      return "Confirmado";
    case "completed":
      return "Concluído";
    case "canceled": // Adicionado status 'canceled'
      return "Cancelado";
    case "rated":
      return "Avaliado";
    default:
      return status;
  }
};


export default function LembretesList({ lembretes = [], onAtualizar }) {
  const router = useRouter();

  const handleAvaliar = (lembrete) => {
    // ⭐️ ADICIONANDO A VERIFICAÇÃO PRINCIPAL:
    if (lembrete.isRated || translateAppointmentStatus(lembrete.status, lembrete.isRated) === "Avaliado") {
      // Se já foi avaliado (pela flag ou pelo status traduzido), interrompe a navegação
      return;
    }

    // Navega para a tela de avaliação
    router.push({
      pathname: "/screens/lembreteScreens/AvaliarScreen",
      params: { appointmentId: lembrete.id, serviceId: lembrete.serviceId, providerId: lembrete.providerId },
    });
  };

  // Agrupamento de lembretes por hora (mantido)
  const lembretesAgrupados = lembretes.reduce((acc, l) => {
    const hora = l.hora || "00:00";
    if (!acc[hora]) acc[hora] = [];
    acc[hora].push(l);
    return acc;
  }, {});

  const horasOrdenadas = Object.keys(lembretesAgrupados).sort(
    (a, b) => parseInt(a.replace(":", "")) - parseInt(b.replace(":", ""))
  );

  return (
    <View style={styles.container}>
      {horasOrdenadas.length > 0 ? (
        horasOrdenadas.map((horaPrincipal) => (
          <View key={horaPrincipal} style={styles.horaGroup}>
            <Text style={styles.horaPrincipal}>{horaPrincipal}</Text>

            {lembretesAgrupados[horaPrincipal].map((l) => {
              const translatedStatus = translateAppointmentStatus(l.status, l.isRated);
              const isCompleted = translatedStatus === "Concluído";
              const alreadyRated = translatedStatus === "Avaliado";

              return (
                <View key={l.id} style={styles.card}>
                  <View style={[styles.barra, { backgroundColor: l.cor || "#2F8B88" }]} />
                  <View style={styles.info}>
                    <Text style={styles.titulo}>{l.titulo}</Text>
                    <Text style={styles.descricao}>
                      {l.descricao}
                    </Text>

                    <View style={styles.footer}>
                      <Text style={styles.horaTexto}>{l.hora}</Text>

                      {isCompleted && !alreadyRated && (
                        <Pressable
                          style={styles.btnAvaliar}
                          onPress={() => handleAvaliar(l)}
                        >
                          <Text style={styles.btnAvaliarText}>Avaliar</Text>
                        </Pressable>
                      )}

                      {alreadyRated && (
                        <Text style={styles.textAvaliado}>Avaliado</Text>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ))
      ) : (
        <Text style={styles.semLembretes}>Nenhum lembrete neste dia</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  horaGroup: { marginBottom: 20 },
  horaPrincipal: {
    color: "#8E8E8E",
    fontSize: 13,
    fontWeight: "400",
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
  barra: { width: 3, borderRadius: 10, marginRight: 10 },
  info: { flex: 1 },
  titulo: { fontWeight: "500", fontSize: 15, color: "#2F8B88" },
  descricao: { color: "#8E8E8E", fontSize: 13, marginBottom: 8 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horaTexto: { color: "#2F8B88", fontSize: 13, fontWeight: "500" },
  semLembretes: { textAlign: "center", color: "#8E8E8E", marginTop: 30 },

  // Estilos do Botão/Texto de Avaliação
  btnAvaliar: {
    backgroundColor: "#2F8B88",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnAvaliarText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  textAvaliado: {
    color: "#2F8B88",
    fontSize: 13,
    fontWeight: "600",
  },
});