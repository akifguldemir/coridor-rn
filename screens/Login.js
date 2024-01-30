import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Modal,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

function Login() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [inputGroup, setInputGroup] = useState({
    email: "",
    password: "",
  });

  function handleSubmit() {
    return;
  }

  function goToRegister() {
    navigation.navigate("Register");
  }

  const goToCoridorSite = (url) => {
    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          console.error("Tarayıcı açılamadı");
        } else {
          console.log("Tarayıcı başarıyla açıldı");
        }
      })
      .catch((err) => console.error("Hata:", err));
  };

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
      <Pressable onPress={goToRegister}>
        <Text style={styles.warningText}>
          Hala kayıtlı değil misin?{" "}
          <Text style={styles.registerButton}>Kaydol</Text>
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.whatIsCoridorText}>Coridor nedir ?</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}></View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Image
              style={styles.modalLogo}
              source={require("../assets/coridor1.png")}
            ></Image>
            <Text style={styles.modalText}>
              Coridor, kendiniz ve toplum için etki yaratabileceğini projelere,
              etkinliklere ulaşabilmenizi sağlayan dijital geçittir.Görev
              noktalarından katılım sağladıkça kazandığınız puanları, köy
              okulları için kitap bağışına dönüştürür ve farklı deneyim ödülleri
              kazanmanızı sağlar.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => goToCoridorSite("https://www.info.coridor.co/")}
            >
              <Text style={styles.textStyle}>Yolculuğumuzun Detayları</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalLogo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 16
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
  warningText: {
    textAlign: "center",
    marginVertical: 10,
  },
  registerButton: {
    color: GlobalStyles.colors.mainColor,
    fontWeight: "600",
  },
  modalButton: {
    marginTop: 40,
    textAlign: "center",
    color: "grey",
    textDecorationLine: "underline",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: GlobalStyles.colors.mainColor,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  whatIsCoridorText:{
    color: '#96999d',
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalHeader: {
    flexDirection: "row",
    marginBottom: 4,
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
});
