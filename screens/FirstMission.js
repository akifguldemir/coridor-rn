import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { clearToken } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FirstMission() {
  dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(clearToken());
  };

  return (
    <View>
      <Text>First Mission</Text>
      <Button onPress={logout} title="Çıkış"></Button>
    </View>
  );
}

export default FirstMission;
