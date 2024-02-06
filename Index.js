import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import { GlobalStyles } from "./constants/styles";
import Register from "./screens/Register";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store/store";
import FirstMission from "./screens/FirstMission";
import Toast from "react-native-toast-message";
import LocalStorage from "./utils/LocalStorage";
import { useEffect } from "react";
import { login } from "./store/authSlice";

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await LocalStorage.getItem("token");
        if (storedToken) {
          dispatch(login(storedToken, false));
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };

    checkToken();
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log('isLoggedIn', isLoggedIn)
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.mainColor },
              headerTintColor: "white",
            }}
          >
            {isLoggedIn && <Stack.Screen
              name="FirstMission"
              component={FirstMission}
              options={{ title: "İlk Görev", headerLeft: () => null }}
            />}
            {!isLoggedIn && <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "" }}
            />}
            
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Kaydol" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
