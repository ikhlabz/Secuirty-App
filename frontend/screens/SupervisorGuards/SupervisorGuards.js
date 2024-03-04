import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./supervisor-guards.styles";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../../assets/Logo.png";
import plusIcon from "../../assets/plus-48.png";
import { useNavigation } from "@react-navigation/native";
import { TextField } from "../../components/TextInput/TextInput";
import { useAuthContext } from "../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { usePostContext } from "../../context/PostContext";

const SupervisiorGuards = () => {
  let { login, isLoggedIn, loading, isSuperVisor } = useAuthContext();
  let { PostGuardData } = usePostContext();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    image: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted === false) {
      console.log("Permission Denied");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImagePreview(result.assets[0].uri);
      setImage(`data:image/jpg;base64,${result.assets[0].base64}`);
      setData({
        ...data,
        image: `data:image/jpg;base64,${result.assets[0].base64}`,
      });
    }
  };

  const handleSubmit = async () => {
    if (!data.email.includes("@")) {
      console.log("Invalid username or password");
      return;
    }
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("securityGuardImage", data.image);

    await PostGuardData(formData);

    setData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      image: "",
    });
    setImage(null);
    setImagePreview(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.imgContainer}>
          <Image source={Logo} style={styles.logoImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Create Guard</Text>
        </View>
        <View style={styles.imageSection}>
          <TouchableOpacity onPress={handleImage}>
            <Image
              source={!image ? plusIcon : { uri: imagePreview }}
              style={!image ? { height: 50, width: 50 } : styles.insertImg}
            />
          </TouchableOpacity>
        </View>
        {/* TextInput for email and password */}
        <TextField
          placeholder={"First Name"}
          onTextChange={(text) => setData({ ...data, firstName: text })}
          value={data.firstName}
        />
        <TextField
          placeholder={"Last Name"}
          onTextChange={(text) => setData({ ...data, lastName: text })}
          value={data.lastName}
        />
        <TextField
          placeholder={"Email"}
          onTextChange={(text) => setData({ ...data, email: text })}
          value={data.email}
        />
        <TextField
          placeholder={"Password"}
          onTextChange={(text) => setData({ ...data, password: text })}
          password={true}
          value={data.password}
        />
        <TextField
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
  );
};

export default SupervisiorGuards;
