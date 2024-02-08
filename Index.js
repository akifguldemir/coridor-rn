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
import { useEffect } from "react";
import { login } from "./store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toastConfig } from "./utils/ToastConfig";
const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  console.log('stateToken', token)
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        console.log("storedToken", storedToken);
        if (storedToken) {
          dispatch(login(storedToken, false));
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };

    checkToken();
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);
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
            {isLoggedIn ? (
              <Stack.Screen
                name="FirstMission"
                component={FirstMission}
                options={{ title: "İlk Görev", headerLeft: () => null }}
              />
            ) : (
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: "", headerLeft: () => null }}
              />
            )}

            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Kaydol" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <Toast config={toastConfig}/>
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
  test: {
    backgroundColor: 'yellow'
  }
});
