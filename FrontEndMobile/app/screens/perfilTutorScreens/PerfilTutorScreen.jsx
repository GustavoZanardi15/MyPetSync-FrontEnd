import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const COLORS = {
  bg: "#F6F7FB",
  card: "#FFFFFF",
  text: "#0F172A",
  sub: "#64748B",
  border: "#E6E9F1",
  brand: "#0FA3A5",
  tint: "#EEF2FF",
  dangerBg: "#FFE8E8",
  danger: "#C0392B",
};

export default function PerfilTutorScreen() {
  const user = {
    name: "Lucas Leal",
    email: "lucas@email.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&fit=crop",
    stats: { pets: 3, reminders: 8, scheduled: 2 },
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => router.push("/screens/perfilTutorScreens/EditPerfilScreen")}
          activeOpacity={0.9}
        >
          <Ionicons name="create-outline" size={18} color={COLORS.text} />
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Card principal */}
      <View style={styles.card}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.row}>
          <Stat number={user.stats.pets} label="Pets" />
          <Divider />
          <Stat number={user.stats.reminders} label="Lembretes" />
          <Divider />
          <Stat number={user.stats.scheduled} label="Agendados" />
        </View>
      </View>

      {/* Sessões */}
      <Section title="Conta">
        <Item
          icon={<Ionicons name="person-outline" size={20} color={COLORS.brand} />}
          label="Editar perfil"
          onPress={() => router.push("/screens/perfilTutorScreens/EditPerfilScreen")}
        />
        <Item
          icon={<MaterialIcons name="pets" size={20} color={COLORS.brand} />}
          label="Meus pets"
          onPress={() => {}}
        />
        <Item
          icon={<Ionicons name="calendar-outline" size={20} color={COLORS.brand} />}
          label="Agendamentos"
          onPress={() => {}}
        />
        <Item
          icon={<Ionicons name="document-text-outline" size={20} color={COLORS.brand} />}
          label="Lembretes"
          onPress={() => router.push("/screens/lembreteScreens/LembreteScreen")}
        />
      </Section>

      <Section title="Preferências">
        <Item
          icon={<Ionicons name="notifications-outline" size={20} color={COLORS.brand} />}
          label="Notificações"
          onPress={() => {}}
        />
        <Item
          icon={<Ionicons name="shield-checkmark-outline" size={20} color={COLORS.brand} />}
          label="Privacidade"
          onPress={() => {}}
        />
        <Item
          icon={<Ionicons name="color-palette-outline" size={20} color={COLORS.brand} />}
          label="Tema"
          value="Padrão"
          onPress={() => {}}
        />
      </Section>

      <Section>
        <Item
          icon={<Ionicons name="help-circle-outline" size={20} color={COLORS.brand} />}
          label="Ajuda"
          onPress={() => {}}
        />
        <Item
          icon={<Ionicons name="information-circle-outline" size={20} color={COLORS.brand} />}
          label="Sobre"
          onPress={() => {}}
        />
        <Item
          icon={<Ionicons name="log-out-outline" size={20} color={COLORS.danger} />}
          label="Sair"
          danger
          onPress={() => {}}
        />
      </Section>
    </ScrollView>
  );
}

function Stat({ number, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      {children}
    </View>
  );
}

function Item({ icon, label, value, onPress, danger }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.itemLeft}>
        <View style={[styles.itemIcon, danger && { backgroundColor: COLORS.dangerBg }]}>{icon}</View>
        <Text style={[styles.itemLabel, danger && { color: COLORS.danger, fontWeight: "600" }]}>{label}</Text>
      </View>
      <View style={styles.itemRight}>
        {value ? <Text style={styles.itemValue}>{value}</Text> : null}
        <Ionicons name="chevron-forward" size={18} color="#9AA3B2" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 22, fontWeight: "700", color: COLORS.text },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ECEFF5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  editText: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: { width: 96, height: 96, borderRadius: 48, alignSelf: "center", marginBottom: 12 },
  name: { fontSize: 20, fontWeight: "700", textAlign: "center", color: COLORS.text },
  email: { fontSize: 14, color: COLORS.sub, textAlign: "center", marginTop: 2 },
  row: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F7F8FC",
    borderRadius: 12,
    padding: 12,
  },
  stat: { alignItems: "center", flex: 1 },
  divider: { width: 1, height: 28, backgroundColor: COLORS.border },
  statNumber: { fontSize: 18, fontWeight: "700", color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.sub, marginTop: 2 },
  section: { marginTop: 16, marginHorizontal: 20 },
  sectionTitle: { fontSize: 14, color: COLORS.sub, marginBottom: 8, fontWeight: "600" },
  item: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  itemLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  itemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  itemLabel: { fontSize: 15, color: COLORS.text },
  itemRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  itemValue: { fontSize: 13, color: "#9AA3B2" },
});
