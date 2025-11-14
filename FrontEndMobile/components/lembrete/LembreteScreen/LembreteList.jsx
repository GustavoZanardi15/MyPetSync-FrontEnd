import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function LembretesList({ lembretes = [], onAtualizar }) {
  const router = useRouter();

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

            {lembretesAgrupados[horaPrincipal].map((l) => (
              <View key={l.id} style={styles.card}>
                <View style={[styles.barra, { backgroundColor: l.cor || "#2F8B88" }]} />
                <View style={styles.info}>
                  <Text style={styles.titulo}>{l.titulo}</Text>
                  <Text style={styles.descricao}>{l.descricao}</Text>

                  <View style={styles.footer}>
                    <Text style={styles.horaTexto}>{l.hora}</Text>

                    {l.status === "completed" && (
                      <Pressable
                        style={styles.avaliarButton}
                        onPress={() =>
                          router.push({
                            pathname: "/screens/lembreteScreens/AvaliarScreen",
                            params: { agendamentoId: l.id },
                          })
                        }
                      >
                        <Text style={styles.avaliarText}>Avaliar</Text>
                      </Pressable>
                    )}

                    {l.status === "scheduled" && onAtualizar && (
                      <Pressable
                        style={[styles.actionButton, { backgroundColor: "#FFAA33" }]}
                        onPress={() => onAtualizar(l.id, { status: "confirmed" })}
                      >
                        <Text style={styles.avaliarText}>Confirmar</Text>
                      </Pressable>
                    )}

                    {l.status === "confirmed" && onAtualizar && (
                      <Pressable
                        style={[styles.actionButton, { backgroundColor: "#2F8B88" }]}
                        onPress={() => onAtualizar(l.id, { status: "completed" })}
                      >
                        <Text style={styles.avaliarText}>Concluir</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            ))}
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  horaTexto: { color: "#2F8B88", fontSize: 13 },
  semLembretes: {
    textAlign: "center",
    color: "#8E8E8E",
    marginTop: 160,
    fontSize: 14,
  },
  avaliarButton: {
    backgroundColor: "#2F8B88",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  avaliarText: { color: "#fff", fontWeight: "bold" },
});