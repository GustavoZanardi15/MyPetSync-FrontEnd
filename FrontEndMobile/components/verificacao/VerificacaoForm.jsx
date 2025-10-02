import { router } from "expo-router";
import React, { useRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Keyboard } from "react-native";

const CODE_LENGTH = 5; 

export default function VerificacaoForm({ code, setCode }) {
  const inputs = useRef([]); 

  const setInputRef = (el, index) => {
    inputs.current[index] = el;
  };

  const handleChangeText = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (index === CODE_LENGTH - 1 && text.length === 1) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.text}>{"Insira o código enviado"}</Text>
      
      <View style={styles.codeInputContainer}>
        {[...Array(CODE_LENGTH)].map((_, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={code[index]}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            ref={(el) => setInputRef(el, index)}
            textAlign="center"
          />
        ))}
      </View>

      <Pressable style={styles.resendContainer} onPress={() => router.push("/RecuperarSenhaScreen")}>
        <Text style={styles.resendText}>Envie o código novamente</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    alignItems: "center",
    paddingTop: 40,
    width: "100%",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    width: "100%",
    maxWidth: 327,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 327,
    marginBottom: 20,
  },
  codeInput: {
    width: 56,
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 16,
    textAlign: "center",
    fontSize: 24,
    color: "#2F8B88",
    borderWidth: 1, 
    borderColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  resendContainer: {
    alignSelf: "flex-end",
    marginRight: 0,
    marginTop: 10,
    maxWidth: 327,
    width: "100%",
  },
  resendText: {
    color: "#89CFF0", 
    fontSize: 15,
    textAlign: "right",
  },
});
