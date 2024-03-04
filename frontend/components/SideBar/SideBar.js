import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SideBar = () => {
  const navigation = useNavigation();
  console.log(navigation);
  return (
    <View>
      <Text>SideBar</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SideBar;
