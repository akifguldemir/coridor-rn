import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function CustomInput({ style, textInputConfig, placeholder }) {
  let inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput placeholder={placeholder} style={inputStyles} {...textInputConfig} />
    </View>
  );
}
export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  input: {
    color: GlobalStyles.colors.mainColor,
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
    borderColor: GlobalStyles.colors.inputGray,
    borderWidth: 2,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.mainColor,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.mainColor,
  },
});