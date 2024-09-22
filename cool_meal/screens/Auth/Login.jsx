import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePickerExample from "../../components/ImagePickerComponent";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import api from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const navigation = useNavigation();

  const validateEmail = (inputEmail) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
    setIsEmailValid(isValid);
    return isValid;
  };
  handleLogin = async () => {
    // Reset previous error messages
    setEmailError("");
    setPasswordError("");

    // Validate input fields
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }
    try {
      const userData = {
        email: email,

        password: password,
      };

      // Send POST request to backend /api/login endpoint
      const response = await api.post("/api/login", userData);
      // Extract token from response data
      const token = response.data.token;

      // Store token in AsyncStorage
      await AsyncStorage.setItem("token", token);
      console.log(token);

      Alert.alert(response.data.msg);
      navigation.navigate("HomeTabs");
    } catch (error) {
      // Handle registration error
      console.error("Login failed:", error);
      Alert.alert(
        "Login Failed",
        "Login could not be completed. Please try again later."
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            marginTop: 125,
          }}
        >
          <Image
            source={require("../../assets/logos/cool-r.png")}
            style={{
              width: 120,
              height: 110,
            }}
          />
          <Text
            style={{
              fontFamily: "Dancing",
              fontSize: 22,
              marginTop: 25,
            }}
          >
            Welcome Back
          </Text>
        </View>

        {/* input part  */}

        <View
          style={{
            width: 300,
            height: 55,
            borderColor: "#bbb",
            borderWidth: 1,
            alignSelf: "center",
            margin: 10,
            borderRadius: 120,
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
          }}
        >
          <Fontisto name="email" size={24} color="black" />
          <TextInput
            style={{ width: 280, margin: 5 }}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        {emailError ? (
          <Text style={{ color: "red", marginTop: -10, marginLeft: 20 }}>
            {emailError}
          </Text>
        ) : null}

        <View
          style={{
            width: 300,
            height: 55,
            borderColor: "#bbb",
            borderWidth: 1,
            alignSelf: "center",
            margin: 10,
            borderRadius: 120,
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
          }}
        >
          <AntDesign name="lock" size={24} color="black" />
          <TextInput
            style={{ width: 280, margin: 5 }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        {passwordError ? (
          <Text style={{ color: "red", margin: 10 }}>{passwordError}</Text>
        ) : null}

        <TouchableOpacity
          style={{
            backgroundColor: "#00bf63",
            width: 300,
            height: 45,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            alignSelf: "center",
          }}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: "Dancing",
              letterSpacing: 1,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              margin: 4,
              fontFamily: "Dancing",
            }}
          >
            You don't have an account ?
          </Text>
          <Text
            style={{
              fontSize: 18,
              margin: 4,
              color: "#F39200",
              fontWeight: "bold",
            }}
            onPress={() => {
              navigation.navigate("RegisterRestaurant");
            }}
          >
            Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
