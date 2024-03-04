import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Platform,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { COLORS } from "../../constant/theme";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";

const { height, width } = Dimensions.get("screen");

const TextInputContainer = ({ text, onTextChange, value }) => {
  return (
    <KeyboardAvoidingView
      style={styles.inputContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles.FieldContainer}>
        <Text style={styles.TextField}>{text}</Text>

        <TextInput
          style={styles.inputField}
          onChangeText={onTextChange}
          value={value}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export const LoginInput = ({
  placeholder,
  name,
  logoName,
  onTextChange,
  value,
  password,
  refInner,
  onSubmitEditing,
  keyType,
}) => {
  const [isPassword, setIsPassword] = useState(password);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.textInputcontainer}
    >
      <View style={styles.inputStyles}>
        {name && <Text>{name}</Text>}
        {logoName && <AntDesign name={logoName} size={20} color="black" />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="black"
          onChangeText={onTextChange}
          secureTextEntry={isPassword ? true : false}
          autoCorrect={false}
          autoCapitalize="none"
          value={value}
          ref={refInner}
          returnKeyType={keyType}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      {password && (
        <Feather
          name={isPassword ? "eye" : "eye-off"}
          onPress={() => setIsPassword(!isPassword)}
          size={20}
          color="black"
        />
      )}
    </KeyboardAvoidingView>
  );
};

export const TextField = ({
  placeholder,
  name,
  logoName,
  onTextChange,
  value,
  password,
}) => {
  const [isPassword, setIsPassword] = useState(password);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.textFieldcontainer}
    >
      <View style={styles.inputStyles}>
        {name && <Text>{name}</Text>}
        {logoName && <AntDesign name={logoName} size={20} color="black" />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="black"
          onChangeText={onTextChange}
          secureTextEntry={isPassword ? true : false}
          autoCorrect={false}
          autoCapitalize="none"
          value={value}
        />
      </View>
      {password && (
        <Feather
          name={isPassword ? "eye" : "eye-off"}
          onPress={() => setIsPassword(!isPassword)}
          size={20}
          color="black"
        />
      )}
    </KeyboardAvoidingView>
  );
};

export const RNDateTimePicker = ({
  placeholder,
  name,
  mode,
  value,
  onPress,
}) => {
  const [pickerMode, setPickerMode] = useState(mode);
  const [show, setShow] = useState(false);
  const openPicker = () => {
    setShow(true);
  };
  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === "ios");
    if (pickerMode == "datetime") {
      const currentDate = selectedValue || new Date();
      onPress(currentDate);
      setPickerMode("time");
      setShow(Platform.OS !== "ios");
    } else {
      const selectedTime = selectedValue || new Date();
      console.log(selectedTime);
      onPress(selectedTime);
      setShow(Platform.OS === "ios");
      setPickerMode(mode);
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.textFieldcontainer}
    >
      <Pressable onPress={openPicker} style={styles.pickerInputStyles}>
        {name && <Text>{name}</Text>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="black"
          value={
            value && mode === "datetime"
              ? value.toLocaleString()
              : value && mode === "date"
              ? value.toLocaleDateString()
              : value
              ? value.toLocaleTimeString()
              : placeholder
          }
          editable={false}
        />
        {Platform !== "ios" && (
          <AntDesign
            name={mode !== "time" ? "calendar" : "clockcircleo"}
            size={20}
            color="black"
          />
        )}
      </Pressable>
      <View>
        {show && (
          <DateTimePicker
            onChange={onChange}
            value={value ? value : new Date()}
            mode={pickerMode}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export const RNDropDownPicker = ({ placeholder, providedData, getValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState(providedData);
  return (
    <>
      <SafeAreaView style={styles.pickerInput}>
        <DropDownPicker
          open={open}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          items={items}
          itemKey="key"
          setItems={setItems}
          closeOnBackPressed={true}
          closeAfterSelecting={true}
          itemSeparator={true}
          placeholderStyle={{ fontSize: 16 }}
          style={{ backgroundColor: COLORS.lightWhite }}
          itemSeparatorStyle={{ backgroundColor: COLORS.black }}
          listItemContainerStyle={{
            padding: 10,
            backgroundColor: COLORS.white,
            zIndex: 1000,
          }}
          selectedItemContainerStyle={{ backgroundColor: COLORS.gray2 }}
          selectedItemLabelStyle={{ fontWeight: "bold" }}
          listItemLabelStyle={{ color: COLORS.black, fontSize: 16 }}
          placeholder={placeholder}
          listMode="SCROLLVIEW"
          onChangeValue={(itemValue) => getValue(itemValue)}
        />
      </SafeAreaView>
    </>
  );
};

export const TextArea = ({
  placeholder,
  name,
  logoName,
  onTextChange,
  value,
}) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={{
        marginLeft: 20,
        marginRight: 20,
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
      }}
    >
      {name && <Text>{name}</Text>}
      {logoName && <AntDesign name={logoName} size={20} color="black" />}
      <TextInput
        editable
        multiline={true}
        numberOfLines={10}
        maxLength={300}
        placeholder={placeholder}
        style={{
          height: 200,
          textAlignVertical: "top",
          fontSize: 18,
          padding: 5,
        }}
        placeholderTextColor="gray"
        onChangeText={onTextChange}
        value={value}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    marginBottom: 20,
    zIndex: 1000,
  },
  FieldContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.black,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#FFFF",
  },
  TextField: {
    color: COLORS.gray2,
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 5,
    marginRight: 10,
  },
  inputField: {
    fontSize: 18,
  },
  textInputcontainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    width: 350,
    // height:80
  },
  textFieldcontainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    width: 350,
    // height:80
  },
  input: {
    color: COLORS.gray2,
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 5,
    marginRight: 10,
    width: "80%",
    // marginBottom: height >= 826 ? 10 : 0,
    alignItems: "center",
  },
  pickerInput: {
    width: "85%",
    alignItems: "center",
  },
  inputStyles: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerInputStyles: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "ios" ? "40%" : "100%",
    height: "100%",
    justifyContent: "space-between",
  },
});

export default TextInputContainer;
