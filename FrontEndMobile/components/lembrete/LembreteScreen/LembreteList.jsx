import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function LembretesList({ lembretes }) {
  const router = useRouter();

  const lembretesAgrupados = lembretes.reduce((acc, l) => {
    if (!acc[l.hora]) acc[l.hora] = [];
    acc[l.hora].push(l);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
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
                      <Text style={styles.horaTexto}>{l.hora}</Text>

                      {l.status === "completed" && (
                        <Pressable
                          style={styles.avaliarButton}
                          onPress={() =>
                            router.push({
                              pathname:
                                "/screens/lembreteScreens/AvaliarScreen",
                              params: { agendamentoId: l.id },
                            })
                          }
                        >
                          <Text style={styles.avaliarText}>Avaliar</Text>
                        </Pressable>
                      )}
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
  },
  avaliarText: { color: "#fff", fontWeight: "bold" },
});
