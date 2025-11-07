import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function EditPetImage({ imageSource, petColor }) {
    return (
        <View style={styles.imageWrap}>
            <View style={[styles.petCircle, { backgroundColor: petColor || '#FFE9E9' }]} >
                <Image source={imageSource} resizeMode="contain" style={styles.petImage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageWrap: {
        alignItems: "center",
        marginVertical: 20
    },
    petCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 6,
        borderColor: "#FFFFFF",
        alignItems: 'center',
        justifyContent: 'center'
    },
    petImage: {
        width: 90,
        height: 90
    }
});