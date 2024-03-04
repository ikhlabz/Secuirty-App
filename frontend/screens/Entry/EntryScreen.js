import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import styles from "./entryscreen.styles";
import { COLORS } from "../../constant/theme";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useAuthContext } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../../assets/Logo.png";
import Logo from "../../assets/ellipse.png";

const EntryScreen = () => {
  const { setSupervisor } = useAuthContext();
  const navigation = useNavigation();

  const handlePress = (link) => {
    console.log(link);
    navigation.navigate(link);
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#000", "#1E1E1E"]}>
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.imgContainer}>
            <Image source={logo} style={styles.logoImage} />
          </View>
          <Text style={styles.title}>Log in As</Text>
        </SafeAreaView>
        <View style={styles.formContainer}>
          {/* Home options */}
          <View style={styles.homeOptions}>
            <SafeAreaView style={optStyles.container}>
              <TouchableOpacity
                style={optStyles.wrapper}
                onPress={() => {
                  setSupervisor(true);
                  handlePress("Login");
                }}
              >
                <Image source={Logo} />
                <Text style={optStyles.title}>Supervisior</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={optStyles.container}>
              <TouchableOpacity
                style={optStyles.wrapper}
                onPress={() => {
                  setSupervisor(false);
                  handlePress("Login");
                }}
              >
                <Image source={Logo} />
                <Text style={optStyles.title}>Security Guard</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const optStyles = StyleSheet.create({
  container: {
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  wrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 20,
    width: 180,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    ...Platform.select({
      ios: {
        margin: 10,
      },
    }),
  },
  title: {
    color: COLORS.black,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
  },
});

export default EntryScreen;
