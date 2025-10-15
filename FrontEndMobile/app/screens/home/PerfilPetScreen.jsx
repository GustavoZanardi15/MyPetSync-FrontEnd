import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform, StatusBar } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const activePet = {
    name: "Theo",
    age: "4 anos",
    race: "Jack Russell Terrier",
    weight: "3kg800",
    neutered: "Sim",
    specialCondition: "", 
    mainImage: require('../../../assets/images/home/PetPerfilDog.png'), 
    petAvatar1: require('../../../assets/images/home/DogHomePet1.png'),
    petAvatar2: require('../../../assets/images/home/DogHomePet2.png'),
    petAvatar3: require('../../../assets/images/home/CatHomePet.png'),
};

const PetInfoField = ({ label, value }) => (
    <View style={styles.infoFieldContainer}>
        <Text style={styles.infoFieldLabel}>{label}</Text>
        <Text style={[
            styles.infoFieldValue,
            (value.trim() === "" || value.trim() === " ") && styles.infoFieldValueEmpty 
        ]}>
            {value.trim() === "" || value.trim() === " " ? label + (label.endsWith(":") ? "" : "") : value}
        </Text>
    </View>
);

const BottomNavBar = () => {
    const router = useRouter();
    
    return (
        <View style={styles.bottomNav}>
            <Pressable onPress={() => router.push("/agenda")}>
                <Image source={require("../../../assets/images/home/NavBarCalendar.png")} />
            </Pressable>
            <Pressable onPress={() => router.push("/servicos")}>
                <Image source={require("../../../assets/images/home/NavBarServico.png")} />
            </Pressable>
            <Pressable onPress={() => router.push("/screens/home/HomeScreen")}>
                <Image source={require("../../../assets/images/home/NavBarHome.png")} /> 
            </Pressable>
            <Pressable onPress={() => router.push("/screens/home/PerfilPetScreen")}>
                <Image source={require("../../../assets/images/home/NavBarPetSelect.png")} /> 
            </Pressable>
            <Pressable onPress={() => router.push("/perfil")}>
                <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
            </Pressable>
        </View>
    );
}

export default function PerfilPetScreen() {
    const router = useRouter();

    return (
        <View style={styles.fullScreen}>
            <View style={styles.topBackground} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Pets</Text>
                    <View style={styles.avatarRow}>
                        <Pressable style={[styles.petAvatarWrapper, styles.activeAvatar]}>
                            <Image source={activePet.petAvatar1} style={styles.petImageThumb} />
                        </Pressable>
                        <Pressable style={styles.petAvatarWrapper}>
                            <Image source={activePet.petAvatar2} style={styles.petImageThumb} />
                        </Pressable>
                        <Pressable style={styles.petAvatarWrapper}>
                            <Image source={activePet.petAvatar3} style={styles.petImageThumb} />
                        </Pressable>
                        <Pressable style={[styles.petAvatarWrapper, styles.addPetButton]} onPress={() => router.push("/screens/addPetScreens/NomePetScreen")}>
                            <Ionicons name="add" size={24} color="#2F8B88" />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.mainImageWrapper}>
                        <Image 
                            source={activePet.mainImage}
                            style={styles.mainPetImage}
                            resizeMode="cover"
                        />
                        <View style={styles.nameAgeBox}>
                            <Text style={styles.petNameText}>{activePet.name}</Text>
                            <Text style={styles.petAgeText}>{activePet.age}</Text>
                        </View>
                        <Pressable style={[styles.actionButton, styles.editButton]} onPress={() => router.push(`/editar-pet/${activePet.name}`)}>
                            <MaterialCommunityIcons name="pencil" size={24} color="#2F8B88" />
                        </Pressable>
                        <Pressable style={[styles.actionButton, styles.vetButton]} onPress={() => router.push(`/historico-medico/${activePet.name}`)}>
                            <MaterialCommunityIcons name="stethoscope" size={24} color="#2F8B88" />
                        </Pressable>
                    </View>

                    <View style={styles.infoSection}>
                        <PetInfoField label="Raça" value={activePet.race} />
                        <PetInfoField label="Idade" value={activePet.age} />
                        <PetInfoField label="Peso atual" value={activePet.weight} />
                        <PetInfoField label="Castrado?" value={activePet.neutered} />
                        <PetInfoField label="Condição especial:" value={activePet.specialCondition} />
                    </View>
                </View>
                <View style={{ height: 90 }} />
            </ScrollView>
            <BottomNavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#FFFFFF', 
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    topBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200, 
        backgroundColor: '#F5F5F5', 
    },
    scrollContent: {
        paddingBottom: 20, 
    },
    header: {
        paddingTop: 15,
        alignItems: 'center',
        backgroundColor: 'transparent', 
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2F8B88',
        marginBottom: 10,
    },
    avatarRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 20,
    },
    petAvatarWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: 'white', 
    },
    petImageThumb: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    activeAvatar: {
        borderWidth: 3,
        borderColor: '#ADD8E6', 
        padding: 2, 
    },
    addPetButton: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderStyle: 'solid',
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    mainImageWrapper: {
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20,
    },
    mainPetImage: {
        width: 210.35,
        height: 309, 
        borderRadius: 20, 
        backgroundColor: '#FFE9E9', 
    },
    nameAgeBox: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    petNameText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2F8B88',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    petAgeText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2F8B88',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    actionButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    editButton: {
        right: 15,
        top: 15,
    },
    vetButton: {
        right: 15,
        top: 75,
    },
    infoSection: {
        marginTop: 0,
        paddingHorizontal: 0,
    },
    infoFieldContainer: {
        backgroundColor: '#FFFFFF', 
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    infoFieldLabel: {
        fontSize: 12,
        color: '#A9A9A9',
        fontWeight: '500',
        marginBottom: 2,
    },
    infoFieldValue: {
        fontSize: 16,
        color: '#2F8B88',
        fontWeight: '600',
    },
    infoFieldValueEmpty: {
        color: '#A9A9A9', 
        fontWeight: '500',
    },
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
});
