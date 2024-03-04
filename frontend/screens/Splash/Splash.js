import React, { useEffect } from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../../assets/Logo.png"; // Make sure the path is correct
import { useAuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const { loadUser } = useAuthContext();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("refreshToken");
        if (value !== null) {
          loadUser();
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Entry" }],
          });
        }
      } catch (e) {}
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/splashBg.png")}
        style={styles.image}
      >
        <Image source={Logo} style={styles.logoImage} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    width: 223,
    height: 210,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%", // or specify a fixed width
    height: "100%", // or specify a fixed height
    resizeMode: "contain", // or 'cover' or 'stretch' depending on your requirements
  },
});

export default Splash;
