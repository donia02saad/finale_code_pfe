import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    Alert // Import Alert for notifications
} from "react-native";
import axios from 'axios'; // Import axios
import { isIphoneX } from 'react-native-iphone-x-helper';
import { icons, COLORS, SIZES, FONTS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Restaurant = ({ route, navigation }) => {
    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);
    const [restaurantId, setRestaurantId] = useState(null);

    useEffect(() => {
        let { item, currentLocation } = route.params;
        setRestaurant(item);
        setCurrentLocation(currentLocation);
        fetchRestaurantProfile(); // Fetch restaurant profile when the component mounts
    }, [route.params]);

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
                setRestaurantId(result.data._id); // Assuming the restaurant ID is in result.data._id
            } else {
                Alert.alert("Error", result.msg || "Failed to fetch restaurant profile");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "An error occurred while fetching restaurant data");
        }
    };


    React.useEffect(() => {
        let { item, currentLocation } = route.params;
        setRestaurant(item);
        setCurrentLocation(currentLocation);
    }, [route.params]);

    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice();
        let item = orderList.filter(a => a.menuId === menuId);

        if (action === "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1;
                item[0].qty = newQty;
                item[0].total = item[0].qty * price;
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price,
                    name: restaurant.menu.find(item => item.menuId === menuId).name // Add this line
                };
                orderList.push(newItem);
            }
            setOrderItems(orderList);
        } else {
            if (item.length > 0 && item[0]?.qty > 0) {
                let newQty = item[0].qty - 1;
                item[0].qty = newQty;
                item[0].total = newQty * price;
            }
            setOrderItems(orderList);
        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId === menuId);
        return orderItem.length > 0 ? orderItem[0].qty : 0;
    }

    function getBasketItemCount() {
        return orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    }

    function sumOrder() {
        return orderItems.reduce((a, b) => a + (b.total || 0), 0).toFixed(2);
    }

    async function handleOrder() {
        if (getBasketItemCount() === 0) {
            Alert.alert("No items in cart", "Please add items to your cart before ordering.");
            return;
        }
    
        const orderData = {
            restaurant: restaurantId, // Use the fetched restaurant ID
            items: orderItems.map(item => ({
                itemId: item.menuId,
                quantity: item.qty,
                name: item.name
            })),
            totalPrice: sumOrder(),
            paymentId: "your_payment_id_here" // Replace with actual payment ID if needed
        };
    
        console.log(orderData);
    
        try {
            const response = await axios.post('http://10.0.2.2:5000/orders', orderData);
            Alert.alert("Order Successful", "Your order has been placed successfully.");
            navigation.navigate("OrderDelivery", {
                restaurant: restaurant,
                currentLocation: currentLocation
            });
        } catch (error) {
            Alert.alert("Order Failed", "There was an error placing your order.");
        }
    }    

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                {/* Restaurant Name Section */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.list}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{ height: SIZES.height * 0.35 }}>
                                {/* Food Image */}
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: "100%"
                                    }}
                                />

                                {/* Quantity */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: - 20,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25
                                        }}
                                        onPress={() => editOrder("-", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>-</Text>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Name & Description */}
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name} - {item.price.toFixed(2)}</Text>
                                <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
                            </View>

                            {/* Calories */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    source={icons.fire}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10
                                    }}
                                />

                                <Text style={{
                                    ...FONTS.body3, color: COLORS.darygray
                                }}>{item.calories.toFixed(2)} cal</Text>
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return (
            <View style={{ height: 30 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding
                    }}
                >
                    {restaurant?.menu.map((item, index) => {

                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: "clamp"
                        })

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }


    function renderOrder() {
        return (
            <View>
                {renderDots()}
                <View style={{ backgroundColor: COLORS.white, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SIZES.padding * 2, paddingHorizontal: SIZES.padding * 3, borderBottomColor: COLORS.lightGray2, borderBottomWidth: 1 }}>
                        <Text style={{ ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SIZES.padding * 2, paddingHorizontal: SIZES.padding * 3 }}>
                        {/* Location and Payment Info */}
                    </View>
                    {/* Order Button */}
                    <View style={{ padding: SIZES.padding * 2, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={{ width: SIZES.width * 0.9, padding: SIZES.padding, backgroundColor: COLORS.primary, alignItems: 'center', borderRadius: SIZES.radius }}
                            onPress={handleOrder} // Use the new handleOrder function
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isIphoneX() &&
                    <View style={{ position: 'absolute', bottom: -34, left: 0, right: 0, height: 34, backgroundColor: COLORS.white }} />
                }
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
});

export default Restaurant;
