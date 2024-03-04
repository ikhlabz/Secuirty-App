import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./supervisor-locations.styles";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../../assets/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { LoginInput } from "../../components/TextInput/TextInput";
import { useAuthContext } from "../../context/AuthContext";

const SupervisorLocations = () => {
  let { login, isLoggedIn, loading, isSuperVisor } = useAuthContext();
  const navigation = useNavigation();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleSubmit = async () => {
    try {
      // You can perform form submission logic here using the email and password states
      console.log("Email:", email);
      console.log("Password:", password);
      // If email is not valid it stops functon execution and returns
      if (!email.includes("@")) {
        console.log("Invalid username or password");
        return;
      }
      // Axios Request for Login in Context API
      login({
        email: email.toLocaleLowerCase(),
        password: password.toLocaleLowerCase(),
      });
    } catch (error) {
      console.log(error, "Eror");
    }
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#000", "#1E1E1E"]}>
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.imgContainer}>
            <Image source={Logo} style={styles.logoImage} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Create Clients</Text>
          </View>
        </SafeAreaView>

        <View style={styles.formContainer}>
          {/* TextInput for email and password */}
          <LoginInput
            placeholder={"First Name"}
            onTextChange={(text) => setData({ ...data, firstName: text })}
            value={data.firstName}
          />
          <LoginInput
            placeholder={"Last Name"}
            onTextChange={(text) => setData({ ...data, lastName: text })}
            value={data.lastName}
          />
          <LoginInput
            placeholder={"Email"}
            onTextChange={(text) => setData({ ...data, email: text })}
            value={data.email}
          />
          <LoginInput
            placeholder={"Password"}
            onTextChange={(text) => setData({ ...data, password: text })}
            password={true}
            value={data.password}
          />
          <LoginInput
            placeholder={"Phone"}
            onTextChange={(text) => setData({ ...data, phoneNumber: text })}
            value={data.phoneNumber}
          />

          {/* Global Button for linking */}
          <KeyboardAvoidingView style={styles.btn}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Create Guard</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
      {/* <LottieView
      style={{ flex: 1, backgroundColor: COLORS.black }}
      source={require("../../assets/Animation/Animation-1706039916997.json")}
      autoPlay
    /> */}
    </LinearGradient>
  );
};

export default SupervisorLocations;
