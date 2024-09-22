import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    address: "",
    available: true,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Fetch restaurant profile info
  const fetchRestaurantProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://10.0.2.2:5000/api/restaurant", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(token);

      const result = await response.json();
      if (response.ok) {
        setAccountInfo(result.data); // Set accountInfo to the restaurant data
      } else {
        Alert.alert("Error", result.msg || "Failed to fetch profile");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while fetching profile data");
    }
  };

  // Change Password function
  const handlePasswordChange = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://10.0.2.2:5000/api/change-password", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      
      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Password changed successfully!");
        // Reset the input fields
        setCurrentPassword("");
        setNewPassword("");
      } else {
        Alert.alert("Error", result.msg || "Password change failed");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while changing the password");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Remove the token
      navigation.navigate("Login"); // Navigate to the Login screen
      Alert.alert("Success", "Logged out successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  useEffect(() => {
    fetchRestaurantProfile(); // Fetch the profile when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Information</Text>
      <Text>Name: {accountInfo.name}</Text>
      <Text>Email: {accountInfo.email}</Text>
      <Text>Address: {accountInfo.address}</Text>
      <Text>Available: {accountInfo.available ? "Yes" : "No"}</Text>
      
      <Text style={styles.header}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Change Password" onPress={handlePasswordChange} />

      {/* Logout Button */}
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Profile;
