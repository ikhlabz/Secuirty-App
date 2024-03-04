import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  Keyboard,
} from "react-native";
import styles from "./login.styles";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/Logo.png";
import RememberMeCheckbox from "../../components/RememberMe/RememberMeCheckbox";
import { LoginInput } from "../../components/TextInput/TextInput";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
  let { login, isLoggedIn, loading, isSuperVisor, error } = useAuthContext();
  const [activeTab, setActiveTab] = useState("Login");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
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

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const passwordRef = useRef();

  return (
    <>
      <LinearGradient style={{ flex: 1 }} colors={["#000", "#1E1E1E"]}>
        <View style={styles.container}>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.imgContainer}>
              <Image source={Logo} style={styles.logoImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Log in to your Account</Text>
              <Text style={styles.subTitle}>
                Welcome back, please enter your details
              </Text>
            </View>
          </SafeAreaView>

          <View style={styles.formContainer}>
            {/* Options whether you choose login or Register */}
            {/* <View style={styles.btnContainer}> */}
            {/* <Pressable style={styles.btnContainer}>
              <Text style={styles.btnText}>Login</Text>
            </Pressable> */}
            {/* <Pressable onPress={() => handleTabPress("Login")}>
                <Text
                  style={[
                    styles.btnText,
                    activeTab === "Login" && styles.leftIsClicked,
                  ]}
                >
                  Login
                </Text>
              </Pressable>
              <Pressable onPress={() => handleTabPress("Register")}>
                <Text
                  style={[
                    styles.btnText,
                    activeTab === "Register" && styles.rightIsClicked,
                  ]}
                >
                  Register
                </Text>
              </Pressable> */}
            {/* </View> */}
            {/* TextInput for email and password */}
            <LoginInput
              placeholder={"Email/ID"}
              logoName={"mail"}
              onTextChange={handleEmailChange}
              value={email}
              keyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <LoginInput
              placeholder={"Password"}
              refInner={passwordRef}
              onSubmitEditing={() => handleSubmit()}
              password={true}
              logoName={"lock1"}
              keyType="done"
              onTextChange={handlePasswordChange}
              value={password}
            />
            {error && (
              <View style={{ alignSelf: "flex-start" }}>
                <Text style={{ fontSize: 15, color: "red", marginLeft: 3 }}>
                  Email or Password wrong
                </Text>
              </View>
            )}

            {/* For user forgot and remember me */}
            <View style={styles.more}>
              <RememberMeCheckbox />
              <TouchableOpacity style={styles.forgot}>
                <Text>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>

            {/* Global Button for linking */}
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmit}
                disabled={loading ? true : false}
              >
                <Text style={styles.btn}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Login;
