import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constant/theme";

const TopBar = ({ name, link }) => {
  const navigation = useNavigation();

  const handlePress = (link) => {
    {
      link === "SideBar" ? <SideBar /> : navigation.navigate(link);
    }
  };

  return (
    <View style={styles.topBarContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(link)}>
        <Entypo name="chevron-thin-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.mainTitle}>{name}</Text>
      <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  mainTitle: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    color: COLORS.black,
    textTransform: "uppercase",
  },
});

export default TopBar;
