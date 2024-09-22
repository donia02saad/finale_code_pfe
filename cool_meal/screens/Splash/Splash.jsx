import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
 
const Splash = () => {
  
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("../../assets/logos/cool-r.png")}
        style={{
          width: 220,
          height: 210,
          alignSelf: "center",
          marginTop: 50,
        }}
      />
      <View
        style={{
          alignSelf: "center",
          alignContent: "center",
          marginTop: 100,
        }}
      >
        <Text
          style={{
            fontFamily: "Vibes",
            fontSize: 32,
            textAlign:"center"
          }}
        >
          Become a Partner ?
        </Text>

        <TouchableOpacity
          style={{
            width: 260,
            height: 50,
            backgroundColor: "#FFA812",
            alignSelf: "center",
            borderRadius: 20,
            marginTop: 45,
            padding: 5,
          }}
          onPress={() => navigation.navigate("OnBoarding")}
        >
          <Text
            style={{
              fontFamily: "Vibes",
              fontSize: 21,
              textAlign: "center",
              color: "#fff",
              letterSpacing: 1,
              padding:5
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
