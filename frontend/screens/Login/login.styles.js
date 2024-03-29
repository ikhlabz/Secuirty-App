import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constant/theme";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: COLORS.black,
  },
  wrapper: {
    flex: 1,
    marginTop: height >= 826 ? 80 : 0,
    marginLeft: 10,
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  arrow: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: COLORS.primary,
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
  textContainer: {
    marginTop: height >= 826 ? 30 : 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.secondary,
    fontStyle: "italic",
  },
  subTitle: {
    fontSize: 14,
    textTransform: "capitalize",
    fontWeight: "500",
    color: COLORS.secondary,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    gap: height >= 826 ? 10 : 5,
    paddingVertical: height >= 826 ? 50 : 30,
    paddingHorizontal: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  btnContainer: {
    marginVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primary,
    marginHorizontal: 30,
  },
  btnText: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "600",
    textTransform: "uppercase",
    borderColor: COLORS.primary,
  },
  leftIsClicked: {
    width: "auto",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    color: COLORS.secondary,
    paddingRight: 40,
  },
  rightIsClicked: {
    width: "auto",
    backgroundColor: COLORS.primary,
    color: COLORS.black,
    borderRadius: 10,
    color: COLORS.secondary,
  },
  icon: {
    marginRight: 10,
  },
  more: {
    flexDirection: "row",
    gap: 120,
    alignItems: "center",
    marginBottom: 25,
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 2,
  },
  forgot: {
    paddingTop: 10,
  },
  buttonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },

  btn: {
    backgroundColor: COLORS.primary,
    color: COLORS.secondary,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  inputContainer: {
    height: 50,
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 5,
    marginRight: 10,
  },
  inputField: {
    fontSize: 18,
  },
  textInputcontainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    width: 350,
    // height:80
  },
  input: {
    color: COLORS.gray2,
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 5,
    marginRight: 10,
    // marginBottom: height >= 826 ? 10 : 0,
    alignItems: "center",
  },
  inputStyles: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
