import { StyleSheet, StatusBar } from "react-native";
import { COLORS } from "../../constant/theme";

const statusBarHeight = StatusBar.currentHeight || 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    position: "relative",
    width: "auto",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  mainText: {
    color: COLORS.black,
    fontSize: 24,
    textTransform: "uppercase",
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 15,
  },
  policeContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    marginBottom: 20,
  },
  dept: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 20,
    textTransform: "capitalize",
  },
  num: {
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "bold",
  },
});
export default styles;
