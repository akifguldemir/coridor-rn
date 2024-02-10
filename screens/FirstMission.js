import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FirstMission() {
  dispatch = useDispatch();

  const userLogout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <View>
      <Text>First Mission</Text>
      <Button onPress={userLogout} title="Çıkış"></Button>
    </View>
  );
}

export default FirstMission;
