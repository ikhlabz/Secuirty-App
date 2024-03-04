import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constant/theme";

const Button = ({ btnTitle, onPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.btn} onPress={onPress}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onPress ? onPress() : navigation.navigate("HomeScreen")}
      >
        <Text style={styles.btn}>{btnTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },

  btn: {
    backgroundColor: COLORS.primary,
    color: COLORS.secondary,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Button;
