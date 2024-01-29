import { StyleSheet, View, Text, Image, TextInput, Button } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useState } from "react";
import CustomButton from "../components/CustomButton";

function Login() {
  const [inputGroup, setInputGroup] = useState({
    email: "",
    password: "",
  });

  function handleSubmit() {
    return;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoGroup}>
        <Image
          style={styles.logo}
          source={require("../assets/coridor.webp")}
        ></Image>
        <Text style={styles.loginText}>Giriş Yap</Text>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          onChangeText={setInputGroup}
          value={inputGroup.email}
          placeholder="E-posta Adresi"
        />
        <TextInput
          style={styles.input}
          onChangeText={setInputGroup}
          value={inputGroup.password}
          placeholder="Şifre"
        />
      </View>
      <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
      <CustomButton
        title="Giriş Yap"
        style={styles.loginButton}
        onPress={handleSubmit}
      />
      <Text style={styles.warningText}>
        Hala kayıtlı değil misin? <Text style={styles.registerButton}>Kaydol</Text>
      </Text>
      <Text style={styles.modalButton}>Coridor nedir ?</Text>
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    marginVertical: 16,
    marginHorizontal: 26,
  },
  logoGroup: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 70,
    width: 250,
    marginTop: 8,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 20,
    color: GlobalStyles.colors.mainColor,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputGroup: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: "grey",
  },
  forgotPasswordText: {
    textAlign: "right",
    fontSize: 15,
    color: GlobalStyles.colors.mainColor,
    fontWeight: "600",
    marginBottom: 8,
    marginVertical: 8,
  },
  loginButton: {
    backgroundColor: GlobalStyles.colors.mainColor,
  },
  loginButtonGroup: {
    marginVertical: 4,
  },
  warningText:{
    textAlign: 'center',
    marginVertical: 10
  },
  registerButton: {
    color: GlobalStyles.colors.mainColor,
    fontWeight: "600",
  },
  modalButton: {
    marginTop: 40,
    textAlign: 'center',
    color: 'grey',
    textDecorationLine: 'underline',
  }
});
