import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import styles from "./letter-of-employment.styles";
import LOE from "../../assets/contract.png";
import TopBar from "../../components/TopBar/TopBar";
import { COLORS } from "../../constant/theme";
import { useAuthContext } from "../../context/AuthContext";

const LetterOfEmployment = () => {
  const { user } = useAuthContext();
  console.log(user);
  const handleDownload = async (uri) => {
    if (uri) {
      Linking.openURL(uri);
    }
  };
  return (
    <View style={styles.container}>
      {/* TOPBAR CONTAINER */}
      <TopBar name="Letter of Employment" link="HomeScreen" />
      {/* IMAGE CONTAINER */}
      <View style={styles.imgContainer}>
        <Image source={LOE} style={{ height: 70, width: 70 }} />
        <Text style={styles.mainText}>Letter Of Employment</Text>
      </View>
      <View style={{ width: "100%", padding: 10 }}>
        <TouchableOpacity
          onPress={() => handleDownload(user?.employeePdf?.url)}
          style={{
            alignSelf: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            marginTop: 100,
          }}
        >
          <Text
            style={{ color: COLORS.white, fontSize: 15, fontWeight: "bold" }}
          >
            Download
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LetterOfEmployment;
