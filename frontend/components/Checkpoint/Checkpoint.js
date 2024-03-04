import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { CheckBox } from "react-native-btr";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { COLORS } from "../../constant/theme";
import { useAuthContext } from "../../context/AuthContext";
import { useFetchContext } from "../../context/FetchContext";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("screen");

const Checkpoint = ({ name, qrCode, status, id }) => {
  const { token } = useAuthContext();
  const { fetchPatrollingData } = useFetchContext();
  const [isSelected, setSelection] = useState(status ? true : false);
  const [isScanning, setScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status) {
      setSelection(true);
    }
  }, [status]);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // Handle scanned QR code data here
    console.log("TYPE: ", type, "DATA: ", data);
    if (data === name) {
      sendQRCodeData();
    } else {
      alert("Invalid QR Code");
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
        setSelection(true);
        setSuccess(true);
        fetchPatrollingData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setScanning(false); // Reset scanning state after handling scan
    }
  };

  const handleScanPress = () => {
    navigation.navigate("Scanner", {
      name: name,
      qrCode: qrCode,
      status: status,
      id: id,
    });
    // if (!isScanning) {
    //   setScanning(true);
    // }
  };

  const renderCheckpointContent = () => {
    if (isScanning) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: 500,
            height: 500,
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
              paddingVertical: 5,
            }}
            onPress={() => setScanning(false)}
          >
            <Text style={{ color: COLORS.white, fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        {/* CHECKBOX CONTAINER */}
        <Pressable style={styles.wrapper}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={status}
              // onPress={() => setSelection(!isSelected)}
              style={styles.checkbox}
              color={COLORS.primary}
              borderRadius={50}
            />
          </View>
          {/* PATROLLING DESC */}
          <View style={styles.descContainer}>
            <Text
              style={[
                styles.name,
                {
                  color: status ? COLORS.primary : COLORS.black,
                  textDecorationLine: status ? "line-through" : "none",
                },
              ]}
            >
              {name}
            </Text>
            <Text style={styles.desc}>
              Patrol Status: {status ? "Completed" : "Pending"}
            </Text>
          </View>
        </Pressable>
        {/* PATROLLING ACTION */}
        <View style={styles.actionContainer}>
          {status ? (
            <Image source={{ uri: qrCode }} style={styles.img} />
          ) : (
            <TouchableOpacity
              onPress={handleScanPress}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 5,
              }}
            >
              <Text style={{ color: COLORS.white, fontSize: 20 }}>Scan</Text>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return <View style={styles.container}>{renderCheckpointContent()}</View>;
};

export default Checkpoint;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    margin: 20,
  },
  wrapper: {
    flexDirection: "row",
    gap: 20,
  },
  checkboxContainer: {
    width: 20,
    height: 50,
    paddingTop: 10,
  },
  descContainer: {
    gap: 10,
  },
  name: {
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  desc: {},
  actionContainer: {
    gap: 10,
  },
  img: {
    alignSelf: "flex-end",
    width: 50,
    height: 50,
  },
});
