import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function IdadePetForm({ anos, setAnos, meses, setMeses }) {
  const anosArray = [...Array(21).keys()]; 
  const mesesArray = [...Array(13).keys()]; 

  const ScrollPicker = ({ data, value, onChange }) => (
    <FlatList
      data={data}
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
      style={styles.scrollPicker}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <Pressable
          style={styles.scrollItem} 
          onPress={() => onChange(item)}
        >
          <Text
            style={[
              styles.scrollText,
              item === value && styles.selectedText,
            ]}
          >
            {item} 
          </Text> 
        </Pressable>
      )}
    />
  );

  return ( 
    
    <View style={styles.form}>
      
      <View style={styles.pickerWrapper}>
        <View style={styles.pickerContainer}>
          {Platform.OS === "ios" ? (
            <Picker
              selectedValue={anos}
              style={styles.picker}
              onValueChange={(value) => setAnos(value)}
            >
              {anosArray.map((n) => (
                <Picker.Item key={n} label={n.toString()} value={n} />
              ))} 
            </Picker>
          ) : ( 
            <ScrollPicker data={anosArray} value={anos} onChange={setAnos} />
          )} 
        </View>
        <Text style={styles.label}>anos</Text> 
      </View>

      <View style={styles.pickerWrapper}>
        <View style={styles.pickerContainer}>
          {Platform.OS === "ios" ? (
            <Picker
              selectedValue={meses}
              style={styles.picker}
              onValueChange={(value) => setMeses(value)}
            >
              {mesesArray.map((n) => (
                <Picker.Item key={n} label={n.toString()} value={n} />
              ))}
            </Picker>
          ) : (
            <ScrollPicker data={mesesArray} value={meses} onChange={setMeses} />
          )}
        </View>
        <Text style={styles.label}>meses</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    marginTop: 30,
  },
  pickerWrapper: {
    alignItems: 'center',
    marginBottom: 40,
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    paddingBottom: 20,
  },
  pickerContainer: {
    width: 280, 
    height: 70, 
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 280, 
    height: 70,
  },
  scrollPicker: {
    width: 280, 
    height: 70, 
    backgroundColor: "transparent", 
  },
  scrollItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 70, 
    paddingHorizontal: 20, 
  },
  scrollText: {
    fontSize: 24, 
    color: "#888", 
  },
  selectedText: {
    color: "#2F8B88", 
    fontSize: 32,   
    fontWeight: "bold",
  },
  label: {
    color: "#2F8B88",
    fontSize: 15,
    marginTop: 5,
    fontWeight: "regular",
  }
});