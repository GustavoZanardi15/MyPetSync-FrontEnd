import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Pressable,
    Platform,
    StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// --- DADOS MOCKADOS COM INFORMAÇÕES DE SAÚDE ---
const petsData = [
    { 
        id: "dog1", 
        name: "Theo",
        image: require("../../../assets/images/home/DogHomePet1.png"),
        medicamentos: [
            { nome: "Colírio Ocular", descricao: "Aplicar 3 gotas, manhã e noite" },
            { nome: "Drontal Plus", descricao: "1 comprimido a cada 3 meses" }
        ],
        vacinas: [
            { dose: "1ª dose - V8 – aplicada em 18/03/2021", proxima: "próxima: 5ª dose: 2024–2025" },
            { dose: "Giárdia – aplicada em 10/02/2025", proxima: "dose única" }
        ]
    },
    { 
        id: "dog2", 
        name: "Rex",
        image: require("../../../assets/images/home/DogHomePet2.png"),
        medicamentos: [
            { nome: "Anti-inflamatório", descricao: "10mg por dia, durante 5 dias" }
        ],
        vacinas: [
            { dose: "Raiva – aplicada em 01/01/2024", proxima: "Anual: 01/01/2025" }
        ]
    },
    { 
        id: "cat1", 
        name: "Mimi",
        image: require("../../../assets/images/home/CatHomePet.png"),
        medicamentos: [], 
        vacinas: [
            { dose: "Gripe Felina – aplicada em 01/03/2024", proxima: "Anual: 01/03/2025" }
        ]
    },
];

// Componente para a barra de navegação
const BottomNavBar = ({ router }) => (
    <View style={styles.bottomNav}>
        <Pressable onPress={() => router.push("/agenda")}>
            <Image source={require("../../../assets/images/home/NavBarCalendar.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/servicos")}>
            <Image source={require("../../../assets/images/home/NavBarServico.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/screens/homeScreens/HomeScreen")}>
            <Image source={require("../../../assets/images/home/NavBarHome.png")} />
        </Pressable>
        <Pressable onPress={() => router.push("/screens/perfilPetScreens/PerfilPetScreen")}>
            <Image source={require("../../../assets/images/home/NavBarPetSelect.png")} /> 
        </Pressable>
        <Pressable onPress={() => router.push("/perfil")}>
            <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
        </Pressable>
    </View>
);

// Componente principal da tela
export default function SaudePetScreen() {
    const router = useRouter();
    
    // Armazena o objeto do pet selecionado, inicializando com o primeiro pet.
    const [selectedPet, setSelectedPet] = useState(petsData[0]); 

    // Função para renderizar a caixa de medicamento com a barra verde
    const MedicamentoItem = ({ nome, descricao }) => (
        <View style={styles.medicamentoBox}>
            <Text style={styles.medicamentoNome}>{nome}</Text>
            <Text style={styles.medicamentoDesc}>{descricao}</Text>
        </View>
    );

    // Função para mudar o pet selecionado
    const handleSelectPet = (petId) => {
        const pet = petsData.find(p => p.id === petId);
        if (pet) {
            setSelectedPet(pet);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* HEADER */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#2F8B88" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Saúde do Pet</Text>
                    <View style={styles.editCircleButton}>
                    <MaterialCommunityIcons name="stethoscope" size={24} color="#2F8B88" />
                    </View>
                </View>

                {/* PET SELECTOR (Imagens) */}
                <View style={styles.petSelectorContainer}>
                    {petsData.map((p) => (
                        <Pressable key={p.id} onPress={() => handleSelectPet(p.id)}>
                            <Image
                                source={p.image}
                                style={[
                                    styles.petSelectorImage,
                                    // A imagem selecionada fica maior e com borda
                                    selectedPet.id === p.id ? styles.selectedPetImage : styles.unselectedPetImage,
                                ]}
                            />
                        </Pressable>
                    ))}
                </View>

                {/* --- MEDICAMENTOS (DINÂMICO) --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Medicamentos:</Text>
                    {/* Correção de erro usando Optional Chaining (?.) */}
                    {selectedPet.medicamentos?.length > 0 ? ( 
                        selectedPet.medicamentos.map((m, index) => (
                            <MedicamentoItem key={index} nome={m.nome} descricao={m.descricao} />
                        ))
                    ) : (
                        <Text style={styles.emptyText}>Nenhum medicamento cadastrado para {selectedPet.name}.</Text>
                    )}
                </View>

                {/* --- VACINAS (DINÂMICO) --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vacinas:</Text>
                    {/* Correção de erro usando Optional Chaining (?.) */}
                    {selectedPet.vacinas?.length > 0 ? ( 
                        selectedPet.vacinas.map((v, index) => (
                            <View key={index} style={styles.vacinaCard}>
                                <Text style={styles.vacinaDose}>{v.dose}</Text>
                                <Text style={styles.vacinaSub}>{v.proxima}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>Nenhuma vacina cadastrada para {selectedPet.name}.</Text>
                    )}
                </View>

                {/* BOTÃO SALVAR */}
                <Pressable style={styles.saveButton}>
                    <Text style={styles.saveText}>Salvar</Text>
                </Pressable>
                
                {/* Espaço extra para a navbar não cobrir o conteúdo final */}
                <View style={{ height: 60 }} />
                
            </ScrollView>

            {/* NAVBAR */}
            <BottomNavBar router={router} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAF9",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60, 
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    editCircleButton: {
        width: 41,
        height: 41,
        borderRadius: 18,
        right: 90,
        borderWidth: 2,
        borderColor: "#2F8B88",
        backgroundColor: "#F9F9f9",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2F8B88",
    },
    backButton: {
        padding: 4,
    },

    // --- PET SELECTOR (IMAGENS) ---
    petSelectorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centraliza a lista de avatares
        gap: 15,
        marginBottom: 30,
    },
    petSelectorImage: {
        // Agora o borderRadius é baseado no maior tamanho (141 / 2 = 70.5)
        borderRadius: 70.5, 
        aspectRatio: 1,
    },
    selectedPetImage: {
        // NOVAS DIMENSÕES SOLICITADAS: 141x141
        width: 141, 
        height: 141,
        borderWidth: 5,
        borderColor: '#89CFF0',
    },
    unselectedPetImage: {
        // Mantido o tamanho anterior para os não selecionados
        width: 65, 
        height: 65,
        opacity: 0.7,
        borderWidth: 0,
    },

    // --- SEÇÕES ---
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "semibold",
        color: "#2F8B88",
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 14,
        color: "#888",
        fontStyle: 'italic',
        marginTop: 5,
    },

    // --- MEDICAMENTOS ---
    medicamentoBox: {
        borderLeftWidth: 3, 
        borderColor: "#A8E6CF",
        paddingLeft: 10,
        marginBottom: 10,
    },
    medicamentoNome: {
        fontSize: 15,
        fontWeight: "medium",
        color: "#2F8B88",
    },
    medicamentoDesc: {
        fontSize: 13,
        fontWeight: "regular",
        color: "#8E8E8E",
    },

    // --- VACINAS ---
    vacinaCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    vacinaDose: {
        color: "#2F8B88",
        fontWeight: "regular",
        fontSize: 15,
    },
    vacinaSub: {
        color: "#979797",
        fontSize: 13,
        fontWeight: "regular",
    },
    
    // --- BOTÃO SALVAR ---
    saveButton: {
        backgroundColor: "#2F8B88",
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        alignSelf: "center",
        width: 180,
        marginTop: 20,
        shadowColor: "#2F8B88",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    saveText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 15,
    },

    // --- NAVBAR ---
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
    },
});