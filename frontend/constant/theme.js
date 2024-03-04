import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const COLORS = {
  primary: "#fbbf39",
  secondary: "#ffffff",
  // tertiary: "#D65A31",
  gray: "#D9D9D9",
  gray2: "#7B7B7B",
  black: "white",
  white: "#353935",
  bottomBarBg: "#000000",
  textBlack: "#000",
  textWhite: "#fff",
  // white: "white",
  lightWhite: "#28282B",
  // lightWhite: "#F0F0F0",
  red: "#FF3E34",
  animationBg: "rgba(0, 0, 0, .5)",
};

const SHADOWS = {
  small: {
    shadowColor: "rgba(0, 0, 0, 0.3)", // Suggested shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "rgba(0, 0, 0, 0.3)", // Suggested shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};
const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  height,
  width,
};
export { COLORS, SHADOWS, SIZES };
