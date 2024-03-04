import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { COLORS } from "../../constant/theme";

const { height, width } = Dimensions.get("screen");
const statusBarHeight = StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    position: "relative",
    width: "auto",
    height: height >= 826 ? 100 : 50,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 25,
  },
  pay: {
    position: "absolute",
    top: 100,
    right: 150,
  },
  mainText: {
    color: COLORS.black,
    fontSize: 24,
    textTransform: "uppercase",
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: height >= 826 ? 15 : 10,
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: COLORS.secondary,
    fontSize: 20,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  inputContainer: {
    height: 50,
    marginVertical: 10,
  },
  FieldContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.black,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  TextField: {
    color: COLORS.gray2,
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 15,
  },
  inputField: {
    marginLeft: 20,
    fontSize: 15,
  },
  fileUploadCont: {
    flexDirection: "row",
    height: 150,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
    padding: 10,
  },
});

export default styles;
