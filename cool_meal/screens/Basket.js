import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Basket = ({ navigation }) => {
  const [orders, setOrders] = React.useState([]);
  const [restaurantId, setRestaurantId] = React.useState(null);

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

      const result = await response.json();
      if (response.ok) {
        setRestaurantId(result.data._id);
      } else {
        Alert.alert("Error", result.msg || "Failed to fetch restaurant profile");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while fetching restaurant data");
    }
  };

  const fetchOrders = async () => {
    if (!restaurantId) return;

    try {
      const response = await axios.get(`http://10.0.2.2:5000/orders/${restaurantId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  React.useEffect(() => {
    fetchRestaurantProfile();
  }, []);

  React.useEffect(() => {
    fetchOrders();
  }, [restaurantId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>Order Number: {item.orderNumber}</Text>
      <Text style={styles.itemPrice}>Total Price: ${item.totalPrice}</Text>
      <Text style={styles.itemName}>Payment Status: {item.paymentStatus}</Text>
      <Text style={styles.itemName}>Items:</Text>
      {item.items.map((orderItem) => (
        <Text key={orderItem._id} style={styles.itemDetail}>
          {orderItem.quantity} x {orderItem.name}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Basket</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Go Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
  },
  itemDetail: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10, // Indent for sub-items
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Basket;
