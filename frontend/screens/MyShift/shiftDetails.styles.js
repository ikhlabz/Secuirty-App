import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { COLORS } from "../../constant/theme";

const statusBarHeight = StatusBar.currentHeight || 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    marginBottom: 20,
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primary,
    // backgroundColor: COLORS.primary,
    width: "50%",
  },
  btnText: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "600",
    textTransform: "uppercase",
    borderColor: COLORS.primary,
    color: COLORS.white,
    // backgroundColor: COLORS.primary,
  },
  detailsContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  detailsCol: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  detailsLeftSide: {
    width: "30%",
  },
  detailsRightSide: {
    width: "70%",
    paddingHorizontal: 5,
  },
});

export default styles;
