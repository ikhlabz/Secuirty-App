import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { COLORS } from "../../constant/theme";

const statusBarHeight = StatusBar.currentHeight || 60;

const styles = StyleSheet.create({
  container: {},
  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    color: COLORS.black,
    textTransform: "uppercase",
  },
  middleContainer: {
    marginTop: 40,
  },
  name: {
    paddingLeft: 20,
    gap: 10,
    marginBottom: 40,
  },
  text: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: COLORS.black,
  },
  btnContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 161,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    fontStyle: "italic",
    textTransform: "uppercase",
    fontWeight: "400",
    color: COLORS.secondary,
  },
  iconContainer: {
    marginLeft: 20,
    gap: 10,
  },
  checkText: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  endContainer: {
    // marginVertical: -70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  endBtn: {
    width: 161,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.red,
    justifyContent: "center",
    alignItems: "center",
  },
  endText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "400",
    color: COLORS.secondary,
  },
});

export default styles;
