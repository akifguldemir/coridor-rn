import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import { GlobalStyles } from "./constants/styles";
import Register from "./screens/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.mainColor },
              headerTintColor: "white",
            }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "Kaydol" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
