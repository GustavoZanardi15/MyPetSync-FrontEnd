import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import FotoPetForm from "../../../components/addPet/fotoPet/FotoPetForm";
import FotoPetHeader from "../../../components/addPet/fotoPet/FotoPetHeader";
import BottomActions from "../../../components/addPet/fotoPet/BottomActions";

export default function FotoPetScreen() {
    const [petPhotoUri, setPetPhotoUri] = useState(null); 
    
    const petData = {
        name: "Prada",
        age: "4 anos",
    };

    return (
        <View style={styles.container}>
            <View>
            <FotoPetHeader /> 
        
                <Text style={styles.title}>Adicione uma foto do seu Pet</Text>
                
                <FotoPetForm
                    petName={petData.name} 
                    petAge={petData.age} 
                    onPhotoChange={setPetPhotoUri} 
                />
            </View>
            <BottomActions />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: "space-between"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: "center",
    marginBottom: 40
  }
});