import React from "react";
import { View, Text, Modal, Pressable, FlatList, StyleSheet } from "react-native";

export default function SelectionModal({
    isVisible,
    onClose,
    title,
    data,
    onSelect,
}) {
    const renderItem = ({ item }) => (
        <Pressable
            style={modalStyles.modalOption}
            onPress={() => {
                onSelect(item);
                onClose();
            }}
        >
            <Text style={modalStyles.modalText}>{item}</Text>
        </Pressable>
    );

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <Pressable style={modalStyles.modalContainer} onPress={onClose}>
                <View style={modalStyles.modalContent} onStartShouldSetResponder={() => true}>
                    <Text style={modalStyles.modalTitle}>{title}</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        style={{ flexGrow: 0 }}
                    />
                    <Pressable
                        onPress={onClose}
                        style={modalStyles.modalCloseButton}
                    >
                        <Text style={modalStyles.modalCloseText}>Fechar</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
}

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "50%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2F8B88",
        marginBottom: 10,
    },
    modalOption: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    modalText: {
        fontSize: 16,
        color: "#333",
    },
    modalCloseButton: {
        marginTop: 10,
        alignSelf: "center",
    },
    modalCloseText: {
        color: "#2F8B88",
        fontWeight: "bold",
    }
});