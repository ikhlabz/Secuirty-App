import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { CheckBox } from "react-native-btr";
import { COLORS } from "../../constant/theme";
import { useFetchContext } from "../../context/FetchContext";
import { useNavigation } from "@react-navigation/native";

const ShiftList = ({ name, location, value }) => {
  const { locations } = useFetchContext();
  const navigation = useNavigation();
  // const [isSelected, setIsSelected] = useState(true);

  const handlePress = () => {
    navigation.navigate("ShiftDetails", { shiftId: value._id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* <View style={styles.checkBoxContainer}>
          <CheckBox
            checked={isSelected}
            style={styles.checkbox}
            borderRadius={50}
            color={COLORS.primary}
          />
        </View> */}
        <View style={styles.shiftDetails}>
          <Text style={styles.shiftLocation}>{location}</Text>
          <Text style={styles.shiftName}>{name}</Text>
          <Pressable onPress={handlePress}>
            <Text style={styles.shiftDetailsText}>View Shift Details</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  wrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
  },
  checkBoxContainer: {
    marginTop: 3,
    width: 20,
    height: 50,
  },
  checkbox: {
    borderRadius: 50,
  },
  shiftDetails: {
    gap: 4,
    marginLeft: 10,
  },

  shiftDetailsText: {
    color: COLORS.primary,
    marginTop: 5,
    textDecorationLine: "underline",
    textDecorationColor: COLORS.primary,
  },
  shiftLocation: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    color: COLORS.black,
  },
  shiftName: {
    fontSize: 18,
    color: COLORS.primary,
    fontStyle: "normal",
    fontWeight: "400",
    textTransform: "capitalize",
  },
  shiftDate: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    color: COLORS.black,
  },
  ptrArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default ShiftList;
