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
} from "react-native";
import styles from "./pay-stub.styles";
import payStub from "../../assets/Paystub.png";
import TopBar from "../../components/TopBar/TopBar";

const PayStub = () => {
  const { height } = Dimensions.get("screen");

  const handleSubmit = () => {
    console.log(payData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* TOPBAR CONTAINER */}
        <TopBar name="Pay Stub" link="HomeScreen" />
        {/* IMAGE CONTAINER */}
        <View style={styles.imgContainer}>
          <Image source={payStub} style={{ height: 70, width: 70 }} />
          <Text style={styles.mainText}>Pay Stub</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PayStub;

// const [name, setName] = React.useState("")
//     const [userId, setUserId] = React.useState("")
//     const [subject, setSubject] = React.useState("")
//     const [message, setMessage] = React.useState("")
