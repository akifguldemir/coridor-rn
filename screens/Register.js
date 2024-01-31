import { View, StyleSheet, Image, Text } from "react-native";
import { GlobalStyles } from "../constants/styles";
import CustomInput from "../components/CustomInput";
import { useState } from "react";

function Register() {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    birthdate: "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue },
      };
    });
  }
  return (
    <View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/coridor.webp")}
        ></Image>
      </View>
      <Text style={styles.input}>Kaydol</Text>
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="E-Posta"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "email"),
            value: inputs.email,
          }}
        />
      </View>
    </View>
  );
}
export default Register;

const styles = StyleSheet.create({
  logoContainer: {
    marginHorizontal: 4,
    marginTop: 36,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    margin: 16,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    color: GlobalStyles.colors.mainColor,
    padding: 6,
    borderRadius: 6,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  logo: {
    height: 70,
    width: 250,
    marginTop: 8,
    marginBottom: 40,
  },
});
