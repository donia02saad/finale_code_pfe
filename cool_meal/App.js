import React, { useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { Restaurant, OrderDelivery } from "./screens";
import Tabs from "./navigation/tabs";
import Splash from "./screens/Splash/Splash";
import OnBoarding from "./screens/OnBoarding/OnBoarding";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import Basket from "./screens/Basket";
import RegisterRestaurant from "./screens/Auth/RegisterRestaurant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    Dancing: require("./assets/fonts/DancingScript-Regular.ttf"),
    Vibes: require("./assets/fonts/GreatVibes-Regular.ttf"),
    Unna: require("./assets/fonts/Unna-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Login"}
      >
        {isAuthenticated ? (
          <Stack.Screen name="HomeTabs" component={Tabs} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        {/* <Stack.Screen name="HomeTabs" component={Tabs} /> */}
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="RegisterRestaurant"
          component={RegisterRestaurant}
        />
        <Stack.Screen name="Basket" component={Basket} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
