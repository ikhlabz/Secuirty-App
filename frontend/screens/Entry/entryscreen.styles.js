import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constant/theme";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: COLORS.white,
  },
  wrapper: {
    flex: 1,
    marginTop: height >= 826 ? 20 : 0,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  imgContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 120,
    width: 143,
    height: 118,
    marginTop: height >= 826 ? 20 : 0,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.secondary,
    fontStyle: "italic",
    marginTop: 50,
  },
  homeOptions: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    width: width,
    marginHorizontal: 10,
  },
  formContainer: {
    backgroundColor: COLORS.bottomBarBg,
    alignItems: "center",
    gap: height >= 826 ? 10 : 0,
    paddingVertical: height >= 826 ? 100 : 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default styles;
