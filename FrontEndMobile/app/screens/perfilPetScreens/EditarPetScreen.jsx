import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform, StatusBar, TextInput } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const EditableField = ({ label, initialValue, onValueChange, iconName = "pencil" }) => {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <View style={editStyles.inputContainer}>
            <Text style={editStyles.inputLabel}>{label}</Text>
            <TextInput
                style={[
                    editStyles.inputValue,
                    !isEditing && { color: "#7A7A7A" } 
                ]}
                value={value}
                editable={isEditing}
                onChangeText={(text) => {
                    setValue(text);
                    onValueChange?.(text);
                }}
                placeholder={label}
                placeholderTextColor="#A9A9A9"
                keyboardType={label.includes("Peso") ? "numeric" : "default"}
            />
            <Pressable onPress={() => setIsEditing(!isEditing)}>
                <MaterialCommunityIcons
                    name={isEditing ? "check" : iconName}
                    size={20}
                    color={isEditing ? "#2F8B88" : "#A9A9A9"}
                    style={editStyles.inputIcon}
                />
            </Pressable>
        </View>
    );
};
const BottomNavBar = () => {
    const router = useRouter();
    return (
        <View style={editStyles.bottomNav}>
            <Pressable onPress={() => router.push("/agenda")}>
                <Image source={require("../../../assets/images/home/NavBarCalendar.png")} />
            </Pressable>
            <Pressable onPress={() => router.push("/servicos")}>
                <Image source={require("../../../assets/images/home/NavBarServico.png")} />
            </Pressable>
            <Pressable onPress={() => router.push("/screens/homeScreens/HomeScreen")}>
                <Image source={require("../../../assets/images/home/NavBarHome.png")} />
            </Pressable>
            <Pressable onPress={() => router.push("/screens/petPerfilScrees/PerfilPetScreen")}>
                <Image source={require("../../../assets/images/home/NavBarPetSelect.png")} />
            </Pressable>
            <Pressable onPress={() => router.push("/perfil")}>
                <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
            </Pressable>
        </View>
    );
};
export default function EditPetScreen() {
    const router = useRouter();

    const initialPetData = {
        id: "1",
        name: "Theo",
        age: "4 anos",
        race: "Jack Russell Terrier",
        weight: "5kg",
        neutered: "Sim",
        specialCondition: "Nenhuma",
        profileImage: require("../../../assets/images/home/DogHomePet1.png"),
    };

    const [petData, setPetData] = useState({
        race: initialPetData.race,
        age: initialPetData.age,
        weight: initialPetData.weight,
        neutered: initialPetData.neutered,
        specialCondition: initialPetData.specialCondition,
    });

    const handleFieldChange = (field, value) => {
        setPetData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    return (
        <View style={editStyles.fullScreen}>
            <View style={editStyles.header}>
                <Pressable onPress={() => router.back()} style={editStyles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#2F8B88" />
                </Pressable>
                <Text style={editStyles.headerTitle}>Editar informações</Text>
                <MaterialCommunityIcons name="pencil" size={24} color="#2F8B88" />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={[
                    editStyles.scrollContent, 
                    { paddingBottom: 100 } 
                ]}
            >
                <View style={editStyles.imageContainer}>
                    <Image
                        source={initialPetData.profileImage}
                        style={editStyles.petImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={editStyles.fieldsContainer}>
                    <EditableField
                        label="Raça"
                        initialValue={petData.race}
                        onValueChange={(v) => handleFieldChange("race", v)}
                    />
                    <EditableField
                        label="Idade"
                        initialValue={petData.age}
                        onValueChange={(v) => handleFieldChange("age", v)}
                    />
                    <EditableField
                        label="Peso atual"
                        initialValue={petData.weight}
                        onValueChange={(v) => handleFieldChange("weight", v)}
                    />
                    <EditableField
                        label="Castrado?"
                        initialValue={petData.neutered}
                        onValueChange={(v) => handleFieldChange("neutered", v)}
                    />
                    <EditableField
                        label="Condição especial:"
                        initialValue={petData.specialCondition}
                        onValueChange={(v) => handleFieldChange("specialCondition", v)}
                    />
                </View>

                <Pressable style={editStyles.saveButton} onPress={() => router.push("/screens/perfilPetScreens/PerfilPetScreen")}>
                    <Text style={editStyles.saveButtonText}>Salvar</Text>
                </Pressable>

                <View style={{ height: 40 }} />
            </ScrollView>
            
            <BottomNavBar /> 
        </View>
    );
}

const editStyles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        position: "relative"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: "white",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2F8B88",
    },
    imageContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    petImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#FFE9E9",
        borderWidth: 3,
        borderColor: "#2F8B88",
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    fieldsContainer: {
        marginTop: 20,
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 14,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    inputLabel: {
        fontSize: 12,
        color: "#A9A9A9",
        fontWeight: "500",
        position: "absolute",
        top: 5,
        left: 20,
        zIndex: 1,
    },
    inputValue: {
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        paddingTop: 10,
    },
    inputIcon: {
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: "#2F8B88",
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 30,
        width: "80%",
        alignSelf: "center",
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
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
        shadowRadius: 4,
    },
});