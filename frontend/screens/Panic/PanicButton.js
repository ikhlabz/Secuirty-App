import React from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import styles from "./panic-button.style";
import TopBar from "../../components/TopBar/TopBar";
import EmergencyCalls from "../../assets/emergency-call.png";
import Viber from "../../assets/viber.png";
import socket from "../../helpers/socket";
import { COLORS } from "../../constant/theme";
import { useAuthContext } from "../../context/AuthContext";
import { useFetchContext } from "../../context/FetchContext";

const PanicButton = () => {
  const { user } = useAuthContext();
  const { filteredShifts } = useFetchContext();
  console.log(user);
  console.log(filteredShifts.currentShift.locations[0].locationName);
  const click = () => {
    console.log("tapped");
    socket.emit("panic button", {
      firstName: user.firstName,
      lastName: user.lastName,
      location: filteredShifts.currentShift.locations[0].locationName,
      // location: user.locatio
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar name="Panic Button" link="HomeScreen" />
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
        onPress={() => click()}
      >
        <Text
          style={{
            borderColor: COLORS.primary,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            padding: 10,
            paddingHorizontal: 20,
            color: COLORS.white,
            borderWidth: 1,
          }}
        >
          PANIC BUTTON
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PanicButton;
