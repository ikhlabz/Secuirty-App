import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
import { COLORS } from "../../constant/theme";

const { height, width } = Dimensions.get("screen");
const statusBarHeight =
  Platform.OS === "ios" ? 20 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    //
  },
  sideBarContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  introContainer: {
    backgroundColor: COLORS.lightWhite,
    padding: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: COLORS.textWhite,
    fontSize: 18,
    textTransform: "uppercase",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  areaUnit: {
    color: COLORS.textWhite,
    fontSize: 16,
    textTransform: "capitalize",
    fontStyle: "normal",
    fontWeight: "500",
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    objectFit: "cover",
  },
  button: {
    flexDirection: "row",
    margin: 30,
    justifyContent: "center",
    gap: 20,
  },
  logOutButton: {
    position: "absolute",
    top: 10,
    right: 20,
    height: height,
    width: width,
  },
  btn: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
  },
  logOutBtn: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 500,
  },
  img: {
    width: 20,
    height: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: "cover",
  },
  btnText: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    color: COLORS.textWhite,
  },
  homeOptions: {
    paddingTop: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
});

export default styles;
