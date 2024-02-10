import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { GlobalStyles } from "../constants/styles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useSelector, useDispatch } from "react-redux";
import { getAllCities } from "../store/citiesSlice";
import { useFormik } from "formik";
import { signUp } from "../store/authSlice";
import registerValidationSchema from "../utils/RegisterValidationSchema";
import { useNavigation } from "@react-navigation/native";

const gender = [
  { key: "1", value: "Erkek" },
  { key: "2", value: "Kadın" },
];

function Register() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);

  const allCities = useSelector((state) => state.cities.cities);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      birthday: "",
      phone: "",
      gender: "",
      city: "",
      password: ""
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(signUp(values))
      if (result.success) {
        navigation.navigate('Login')
      }
    },
  });

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
            onChangeText: formik.handleChange("fullName"),
            value: formik.values.fullName,
          }}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <Text style={styles.errorText}>{formik.errors.fullName}</Text>
        )}
        <CustomInput
          placeholder="Kullanıcı Adı"
          textInputConfig={{
            onChangeText: formik.handleChange("username"),
            value: formik.values.username,
          }}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
        <CustomInput
          placeholder="E-Posta"
          textInputConfig={{
            onChangeText: formik.handleChange("email"),
            value: formik.values.email,
          }}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}
        <CustomInput
          placeholder="Şifre"
          textInputConfig={{
            onChangeText: formik.handleChange("password"),
            value: formik.values.password,
          }}
        />
        {formik.touched.password && formik.errors.pawssword &&  (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
        <CustomInput
          placeholder="gg.aa.yyyy"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: formik.handleChange("birthday"),
            value: formik.values.birthday,
          }}
        />
        {formik.touched.birthday && formik.errors.birthday && (
          <Text style={styles.errorText}>{formik.errors.birthday}</Text>
        )}
        <CustomInput
          placeholder="Telefon"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: formik.handleChange("phone"),
            value: formik.values.phone,
          }}
        />
        {formik.touched.phone && formik.errors.phone && (
          <Text style={styles.errorText}>{formik.errors.phone}</Text>
        )}
        <SelectList
          setSelected={formik.handleChange("gender")}
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
         {formik.touched.gender && formik.errors.gender && (
          <Text style={styles.errorText}>{formik.errors.gender}</Text>
        )}
        <SelectList
          setSelected={formik.handleChange("city")}
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
        {formik.touched.city && formik.errors.city && (
          <Text style={styles.errorText}>{formik.errors.city}</Text>
        )}
        <CustomButton
          title="Giriş Yap"
          style={styles.submitButton}
          onPress={formik.handleSubmit}
          loading={isLoading}
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
  errorText: {
    color: "red",
  },
});
