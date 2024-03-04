import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import styles from "./pay-discrepancy.styles";
import PayScreen from "../../assets/pay-screen.png";
import PayBot from "../../assets/pay-bottom.png";
import TextInputContainer, {
  TextArea,
} from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";

const PayDiscrepancy = () => {
  const { height } = Dimensions.get("screen");

  const [payData, setPayData] = React.useState({
    name: "",
    userId: "",
    subject: "",
    message: "",
  });

  const handleTextChange = (field, newText) => {
    setPayData((prevPayData) => ({
      ...prevPayData,
      [field]: newText,
    }));
  };

  const handleSubmit = () => {
    console.log(payData);
  };

  return (
    <View style={styles.container}>
      {/* TOPBAR CONTAINER */}
      <TopBar name="Pay Discrepancy" link="HomeScreen" />
      {/* IMAGE CONTAINER */}
      <View style={styles.imgContainer}>
        <Image source={PayScreen} style={styles.img} />
        <Text style={styles.mainText}>pay discrepancy</Text>
      </View>
      {/* TEXT INPUT CONTAINER */}
      <SafeAreaView style={{ marginBottom: height >= 826 ? 20 : 0 }}>
        <TextInputContainer
          text={"Full name"}
          value={payData.name}
          placeholder={"User Name"}
          onTextChange={(newText) => handleTextChange("name", newText)}
        />
        <TextInputContainer
          text={"user-id"}
          value={payData.userId}
          placeholder={"User Id"}
          onTextChange={(newText) => handleTextChange("userId", newText)}
        />
        <TextInputContainer
          text={"subject"}
          value={payData.subject}
          placeholder={"Subject"}
          onTextChange={(newText) => handleTextChange("subject", newText)}
        />
        <TextArea
          text={"Write a Message"}
          value={payData.message}
          placeholder={"Write a message"}
          onTextChange={(newText) => handleTextChange("message", newText)}
        />
      </SafeAreaView>
      {/* BUTTON  */}

      <Pressable style={styles.btnContainer} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default PayDiscrepancy;

// const [name, setName] = React.useState("")
//     const [userId, setUserId] = React.useState("")
//     const [subject, setSubject] = React.useState("")
//     const [message, setMessage] = React.useState("")
