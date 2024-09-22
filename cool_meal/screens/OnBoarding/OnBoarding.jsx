import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
// import { OnboardFlow } from "react-native-onboard";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";

const OnBoarding = () => {
  const navigation = useNavigation();
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/logos/splash2.png")}
              style={{
                width: 320,
                height: 200,
              }}
            />
          ),
          title: "Welcome to Cool Restaurant",
          subtitle: "Register and Start Managing Your Restaurant!",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/logos/splash2.jpg")}
              style={{
                width: 360,
                height: 320,
              }}
            />
          ),
          title: "Create ",
          subtitle: "Share your art with the world",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/logos/splash3.jpg")}
              style={{
                width: 320,
                height: 300,
              }}
            />
          ),
          title: "Promote",
          subtitle: "Grow your bussiness with Cool Restaurant",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
      onSkip={() => navigation.navigate("Login")}
      onDone={() => navigation.navigate("Register")}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  title: {
    color: "#000", // Change color as needed
    fontSize: 28, // Change font size as needed
    fontFamily: "Vibes",
  },
  subtitle: {
    color: "#39C166", // Change color as needed
    fontSize: 24, // Change font size as needed
    fontFamily: "Dancing",
 
  },
});
