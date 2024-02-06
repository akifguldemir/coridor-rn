import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function FirstMission() {
  dispatch = useDispatch();

  const logoutAuth = () => {
    dispatch(logout);
  };

  return (
    <View>
      <Text>First Mission</Text>
      <Button onPress={logoutAuth} title="Çıkış"></Button>
    </View>
  );
}

export default FirstMission;
