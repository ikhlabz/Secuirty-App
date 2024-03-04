import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native"; // Add Platform import
import { COLORS } from "../../constant/theme";
import { useNavigation } from "@react-navigation/native";

const HomeOptions = ({ source, title, link }) => {
  const navigation = useNavigation();

  const handlePress = (link) => {
    console.log(link);
    navigation.navigate(link);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => handlePress(link)}
      >
        <Image source={source} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  wrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightWhite,
    padding: 20,
    width: 150,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    ...Platform.select({
      ios: {
        margin: 10,
      },
    }),
  },
  title: {
    color: COLORS.textWhite,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
  },
});

export default HomeOptions;
