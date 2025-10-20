import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, StatusBar} from "react-native";
import { useRouter } from "expo-router";
import EditPetHeader from "../../../components/pet/editarPet/EditPetHeader";
import EditPetImage from "../../../components/pet/editarPet/EditPetImage";
import EditInfo from "../../../components/pet/editarPet/EditInfo";
import BottomNav from "../../../components/pet/editarPet/BottomNav";

export default function EditarPetScreen() {
    const router = useRouter();

    const initialPetData = {
        profileImage: require("../../../assets/images/home/DogHomePet1.png"),
        race: "Jack Russell Terrier",
        age: "4 anos",
        weight: "5kg",
        neutered: "Sim",
        specialCondition: "",
    };

    const [petData, setPetData] = React.useState(initialPetData);

    const handleFieldChange = (field, value) => {
        setPetData({ ...petData, [field]: value });
    };

    return (
        <View style={styles.fullScreen}>
            <EditPetHeader />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingBottom: 140 }]}>
                <EditPetImage imageSource={initialPetData.profileImage} />

                <View style={styles.fieldsWrapper}>
                    <EditInfo
                        label="Raça"
                        initialValue={petData.race}
                        onValueChange={(v) => handleFieldChange("race", v)}
                    />
                    <EditInfo
                        label="Idade"
                        initialValue={petData.age}
                        onValueChange={(v) => handleFieldChange("age", v)}
                    />
                    <EditInfo
                        label="Peso atual"
                        initialValue={petData.weight}
                        onValueChange={(v) => handleFieldChange("weight", v)}
                    />
                    <EditInfo
                        label="Castrado?"
                        initialValue={petData.neutered}
                        onValueChange={(v) => handleFieldChange("neutered", v)}
                    />
                    <EditInfo
                        label="Condição especial:"
                        initialValue={petData.specialCondition}
                        onValueChange={(v) => handleFieldChange("specialCondition", v)}
                    />
                </View>

                <Pressable
                    style={styles.saveButton}
                    onPress={() => router.push("/screens/perfilPetScreens/PerfilPetScreen")}
                >
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </Pressable>
            </ScrollView>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    fieldsWrapper: {
        marginTop: 10,
        gap: 12,
    },
    saveButton: {
        backgroundColor: "#2F8B88",
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 28,
        width: 200,
        alignSelf: "center",
        shadowColor: "#2F8B88",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4,
    },
    saveButtonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold",
    },
});