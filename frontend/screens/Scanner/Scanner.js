import React from "react";
import {
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { COLORS } from "../../constant/theme";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../context/AuthContext";
import { useFetchContext } from "../../context/FetchContext";
const { height, width } = Dimensions.get("screen");

const Scanner = ({ route }) => {
  const { name, id, qrCode, status } = route.params;
  const { token } = useAuthContext();
  const { fetchPatrollingData } = useFetchContext();
  const navigation = useNavigation();
  console.log(name, id, qrCode, status);

  const handleBarCodeScanned = ({ type, data }) => {
    // Handle scanned QR code data here
    console.log("TYPE: ", type, "DATA: ", data);
    if (data === name) {
      sendQRCodeData();
    } else {
      alert("Invalid QR Code");
      navigation.goBack();
    }
  };

  const sendQRCodeData = async () => {
    // Send scanned QR code data to server
    try {
      const data = await fetch(
        `http://147.182.235.79:5000/api/v1/patrolling/verify-qr/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Origin: "Whitelisted Origin",
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        alert("Checkpoint verified successfully");
        fetchPatrollingData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigation.goBack(); // Reset scanning state after handling scan
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: width,
          height: height,
        }}
      >
        <Camera
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            marginTop: "auto",
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: COLORS.white, fontSize: 20 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Scanner;
