import React, { useState } from "react";
import { Button, Text, View, Modal, TouchableOpacity } from "react-native";

function ModalTester() {
  const [modalVisible, setModalVisible] = useState(true); // Initially set to true to display the modal

  const closeModal = () => {
    setModalVisible(false); // Function to close the modal
  };
  return (
    <View style={{}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 5,
              width: 340,
              height: 400,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                textAlign: "center",
                fontFamily: "Vibes",
                margin: 5,
              }}
            >
              Quick Registration Steps ✔️
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontFamily: "Roboto-Black",
                margin: 5,
              }}
            >
              To register please follow all the following steps.
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "justify",
                fontFamily: "Roboto-Regular",
                margin: 5,
                marginTop: 20,
              }}
            >
              You can stop registration process at any time and continue it
              later. All information will be saved.
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "justify",
                fontFamily: "Roboto-Regular",
                margin: 5,
              }}
            >
              Are you sure you are ready to startthis process? It will only take
              several minutes.
            </Text>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                width: 220,
                height: 40,
                backgroundColor: "#39C166",
                alignSelf: "center",

                margin: 10,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  textAlign: "center",
                  fontFamily: "Dancing",
                  margin: 5,
                  color:"#fff",
              
                }}
              >
                Begin Registration
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;
