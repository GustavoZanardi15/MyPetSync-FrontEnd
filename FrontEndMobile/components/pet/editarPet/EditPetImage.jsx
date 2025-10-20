import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function EditPetImage({ imageSource }) {
    return (
        <View style={styles.imageWrap}>
            <Image
                source={imageSource}
                style={styles.petImage}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageWrap: {
        alignItems: "center",
        marginVertical: 20,
    },
    petImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 6,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFE9E9",
    },
});