import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ModalTester from "../../components/ModalTester";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import ImagePickerComponent from "../../components/ImagePickerComponent";
const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const phoneInput = React.useRef(null);

  const handleRegister = () => {
    // Handle registration logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("id:", id);
    navigation.navigate("RegisterRestaurant");
  };
  return (
    <ScrollView>
      <SafeAreaView
        style={{
          alignSelf: "center",
        }}
      >
        {/* Your Register Screen Content */}
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Dancing",
            fontSize: 20,
            marginTop: 50,
          }}
        >
          As an owner you need to provide your credentials
        </Text>

        {/* Modal */}
        <ModalTester />
        {/* Modal */}
        {/* Owner  */}
        <View
          style={{
            margin: 20,
            alignSelf: "center",
          }}
        >
          <Image
            source={require("../../assets/logos/cool-r.png")}
            style={{
              width: 150,
              height: 140,
              margin: 20,
            }}
            resizeMode="cover"
          />
        </View>

        {/* <Text>Already have an account ? Login</Text> */}
        <View
          style={{
            // borderColor: "#000",
            // borderWidth: 1,
            alignItems: "center",
            alignContent: "start",
          }}
        >
          <View style={styles.inputView}>
            <Ionicons name="person-circle-outline" size={28} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Owner Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputView}>
            <Fontisto name="email" size={28} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.container}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textInput}
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
              defaultCode="IN"
              layout="first"
              withShadow
              autoFocus
            />
          </View>

          <View style={styles.inputView}>
            <AntDesign name="idcard" size={28} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Personal ID"
              value={id}
              keyboardType="numeric"
            />
          </View>
          <ImagePickerComponent title="Front" />
          <ImagePickerComponent title="Back" />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignSelf:"center"
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
        {/* Owner  */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputView: {
    width: 320,
    height: 55,
    // borderColor: "#ccc",

    // borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 5,
  },
  input: {
    width: 240,
    height: 45,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#00bf63",
    width: 280,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneContainer: {
    width: 320,
    height: 55,
    borderRadius: 10,
    margin: 5,
  },
});
