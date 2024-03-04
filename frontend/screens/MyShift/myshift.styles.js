import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { COLORS } from "../../constant/theme";

const statusBarHeight = StatusBar.currentHeight || 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  rightIsClicked: {
    width: "auto",
    backgroundColor: COLORS.primary,
    color: COLORS.black,
    borderRadius: 10,
    color: COLORS.secondary,
  },
  latestContainer: {
    marginHorizontal: 30,
    marginBottom: 80,
  },
  latestText: {
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 10,
  },
  shiftContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 50,
    height: 50,
  },
  shiftDate: {
    gap: 8,
  },
  shiftDateTitle: {
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
    textTransform: "uppercase",
    color: COLORS.primary,
  },
  shiftDateToday: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    textTransform: "capitalize",
    color: COLORS.black,
  },
  calenderContainer: {
    paddingBottom: 10,
  },
  calenderStyles: {
    backgroundColor: COLORS.lightWhite,
    calendarBackground: COLORS.lightWhite,
    textSectionTitleColor: COLORS.primary,
    selectedDayBackgroundColor: COLORS.primary,
    selectedDayTextColor: COLORS.primary,
    todayTextColor: COLORS.primary,
    dayTextColor: COLORS.black,
    textDisabledColor: "#fff",
    arrowColor: COLORS.black,
    textMonthFontWeight: "bold",
    textMonthFontSize: 20,
    textDayHeaderFontSize: 16,
  },
  // calenderStyles: {
  //   height: "auto",
  // },
});

export default styles;
