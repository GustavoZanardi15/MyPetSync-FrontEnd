import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { launchImageLibrary } from 'react-native-image-picker';

export default function FotoPetForm({ petName = "Prada", petAge = "4 anos" }) {
    const [petPhotoUri, setPetPhotoUri] = React.useState(null);

    const handlePhotoUpload = async () => {
        
        const options = {
            mediaType: 'photo', 
            includeBase64: false, 
            selectionLimit: 1, 
        };

        const result = await launchImageLibrary(options);

        if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setPetPhotoUri(uri); 
        }
    };

    return (
        <View style={styles.formContainer}>
            <Pressable
                style={styles.photoCard}
                onPress={handlePhotoUpload}
                activeOpacity={0.8}
            >
                <View style={styles.petInfo}>
                    <Text style={styles.petName}>{petName}</Text>
                    <Text style={styles.petAge}>{petAge}</Text>
                </View>

                <Image
                    source={petPhotoUri ? { uri: petPhotoUri } : require("../../../assets/images/Dog.png")}
                    style={[styles.petIcon, petPhotoUri ? { opacity: 1 } : { opacity: 0.7 }]}
                />

                <View style={styles.addButtonContainer}>
                    <Feather name="plus" size={18.86} color="#2F8B88" />
                </View>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    formContainer: {
        alignItems: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    photoCard: {
        width: 288,
        height: 472,
        backgroundColor: "#A9E4D4",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    petInfo: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 10,
    },
    petName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2F8B88",
    },
    petAge: {
        fontSize: 16,
        color: "#2F8B88",
        opacity: 0.8,
    },
    petIcon: {
        width: 178,
        height: 178,
        resizeMode: "contain",
        opacity: 0.7
    },
    addButtonContainer: {
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: [{ translateX: -25 }],
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#A8E6CF",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#343434",
        borderWidth: 1,
    },
});