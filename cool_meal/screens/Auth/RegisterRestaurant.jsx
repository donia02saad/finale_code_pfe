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
const RegisterRestaurant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation()

  handleRegister = async () => {
    try {
      const userData = {
        name: name,
        email: email,
        address: address,
        password: password,
      };

      // Send POST request to backend /api/register endpoint
      const response = await api.post("/api/register", userData);

      // Handle successful registration
      console.log("Registration successful:", response.data);
      Alert.alert(
        "Registration Successful",
        "You have been registered successfully."
      );
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
      Alert.alert(
        "Registration Failed",
        "Registration could not be completed. Please try again later."
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
            marginTop: 75,
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
              fontSize: 18,
            }}
          >
            Fill in your restaurant credentials
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
            marginTop: 60,
          }}
        >
          <Ionicons name="restaurant-outline" size={24} color="black" />
          <TextInput
            style={{ width: 280, margin: 5 }}
            placeholder="name"
            onChangeText={(text) => setName(text)}
            value={name}
          />
        </View>
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
          <EvilIcons name="location" size={24} color="black" />
          <TextInput
            style={{ width: 280, margin: 5 }}
            placeholder="address"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </View>
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
        <TouchableOpacity
          style={{
            backgroundColor: "#00bf63",
            width: 240,
            height: 45,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            alignSelf: "center",
          }}
          onPress={handleRegister}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: "Dancing",
              letterSpacing: 1,
            }}
          >
            Register
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
            Already a member ?
          </Text>
          <Text
            style={{
              fontSize: 18,
              margin: 4,
              color: "#F39200",
              fontWeight: "bold",
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterRestaurant;

const styles = StyleSheet.create({});
