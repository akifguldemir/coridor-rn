import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { GlobalStyles } from "../constants/styles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useSelector, useDispatch } from "react-redux";
import { getAllCities } from "../store/citiesSlice";

const gender = [
  { key: "1", value: "Female" },
  { key: "2", value: "Male" },
];

function Register() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);

  const allCities = useSelector((state) => state.cities.cities);

  const [inputsRegister, setInputsRegister] = useState({
    fullName: {
      value: "",
    },
    userName: {
      value: "",
    },
    email: {
      value: "",
    },
    password: {
      value: "",
    },
    birthdate: {
      value: "",
    },
    phone: {
      value: "",
    },
    gender: {
      value: "",
    },
    cities: {
      value: "",
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputsRegister((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue },
      };
    });
  }
  function setSelectedGender(val) {
    inputChangedHandler("gender", val);
  }
  function setSelectedCity(val) {
    inputChangedHandler("cities", val);
  }
  function handleSubmit() {
    dispatch(signUp(inputsRegister));
  }

  return (
    <ScrollView>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/coridor.webp")}
        ></Image>
      </View>
      <Text style={styles.input}>Kaydol</Text>
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Ad - Soyad"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "fullName"),
            value: inputsRegister.fullName.value,
          }}
        />
        <CustomInput
          placeholder="Kullanıcı Adı"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "userName"),
            value: inputsRegister.userName.value,
          }}
        />
        <CustomInput
          placeholder="E-Posta"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "email"),
            value: inputsRegister.email.value,
          }}
        />
        <CustomInput
          placeholder="Şifre"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "password"),
            value: inputsRegister.password.value,
          }}
        />
        <CustomInput
          placeholder="gg.aa.yyyy"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "birthdate"),
            value: inputsRegister.birthdate.value,
          }}
        />
        <CustomInput
          placeholder="Telefon"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "phone"),
            value: inputsRegister.phone.value,
          }}
        />
        <SelectList
          setSelected={(val) => setSelectedGender(val)}
          data={gender}
          save="value"
          boxStyles={{
            borderRadius: 30,
            borderColor: GlobalStyles.colors.inputGray,
            borderWidth: 2,
            marginVertical: 8,
          }}
          dropdownStyles={{
            borderRadius: 30,
            borderColor: GlobalStyles.colors.inputGray,
            borderWidth: 2,
          }}
          notFoundText={"Bulunamadı"}
          search={false}
          placeholder={"Cinsiyet"}
        />
        <SelectList
          setSelected={(val) => setSelectedCity(val)}
          data={allCities}
          save="value"
          boxStyles={{
            borderRadius: 30,
            borderColor: GlobalStyles.colors.inputGray,
            borderWidth: 2,
            marginVertical: 8,
          }}
          dropdownStyles={{
            borderRadius: 30,
            borderColor: GlobalStyles.colors.inputGray,
            borderWidth: 2,
          }}
          notFoundText={"Bulunamadı"}
          search={false}
          placeholder={"Şehir"}
        />
        <CustomButton
          title="Giriş Yap"
          style={styles.submitButton}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
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
  submitButton: {
    backgroundColor: GlobalStyles.colors.mainColor,
  },
});
