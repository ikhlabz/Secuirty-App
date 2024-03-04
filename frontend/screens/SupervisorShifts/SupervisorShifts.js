import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./supervisor-shifts.styles";
import Logo from "../../assets/Logo.png";
import {
  TextField,
  RNDateTimePicker,
} from "../../components/TextInput/TextInput";
import { usePostContext } from "../../context/PostContext";

const SupervisorShifts = () => {
  const { PostShiftData } = usePostContext();
  const [data, setData] = useState({
    shiftName: "",
    shiftStartTime: "",
    shiftEndTime: "",
    lunchStartTime: "",
    lunchEndTime: "",
  });

  const handleSubmit = async () => {
    try {
     // await PostShiftData(data);
      setData({
        shiftName: "",
        shiftStartTime: "",
        shiftEndTime: "",
        lunchStartTime: "",
        lunchEndTime: "",
      });
    } catch (error) {
      console.log(error, "Error");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imgContainer}>
          <Image source={Logo} style={styles.logoImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Create Shift</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <TextField
          placeholder={"Shift Name"}
          onTextChange={(text) => setData({ ...data, shiftName: text })}
          value={data.shiftName}
        />
        <RNDateTimePicker
          placeholder={"Shift Start-Time"}
          mode="datetime"
          onPress={(val) => setData({ ...data, shiftStartTime: val })}
          value={data.shiftStartTime}
        />
        <RNDateTimePicker
          placeholder={"Shift End-Time"}
          mode="datetime"
          onPress={(val) => setData({ ...data, shiftEndTime: val })}
          value={data.shiftEndTime}
        />
        <RNDateTimePicker
          placeholder={"Lunch Start-Time"}
          mode="time"
          onPress={(val) => setData({ ...data, lunchStartTime: val })}
          value={data.lunchStartTime}
        />
        <RNDateTimePicker
          placeholder={"Lunch End-Time"}
          mode="time"
          onPress={(val) => setData({ ...data, lunchEndTime: val })}
          value={data.lunchEndTime}
        />

        {/* Global Button for linking */}
        <KeyboardAvoidingView style={styles.btn}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSubmit}
          >
            <Text style={styles.btnText}>Create Shift</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SupervisorShifts;
