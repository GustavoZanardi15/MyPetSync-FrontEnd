import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const BACKGROUND_COLORS = [
    '#A9E4D4', 
    '#B0C4DE', 
    '#FFC0CB', 
    '#F0E68C',
    '#ADD8E6', 
    '#FAFAD2', 
    '#DDA0DD', 
];

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * BACKGROUND_COLORS.length);
    return BACKGROUND_COLORS[randomIndex];
};

export default function PlaceholderFotoCard({ scaleAnim }) {
    const randomBackgroundColor = useMemo(() => getRandomColor(), []);

    return (
        <View style={styles.cardContainer}>
            <Animated.View 
                style={[
                    styles.photoCard,
                    { 
                        backgroundColor: randomBackgroundColor,
                        transform: [{ scale: scaleAnim }] 
                    }
                ]}
            >
                <Feather name="plus-square" size={80} color="#343434" style={{ opacity: 0.6 }} />
                <Text style={styles.placeholderText}>Adicionar Foto</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    photoCard: {
        width: 250,
        height: 250,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    placeholderText: {
        fontSize: 16,
        color: "#343434",
        fontWeight: "600",
        marginTop: 10,
        opacity: 0.7,
    },
});