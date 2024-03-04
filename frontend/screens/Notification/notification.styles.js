import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { COLORS } from "../../constant/theme";

const statusBarHeight = StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationContainer: {
    width: Dimensions.get("window").width,
    height: 120,
    backgroundColor: "#EDF3FF",
    paddingVertical: 10,
  },
  notificationMsg: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    color: COLORS.black,
  },
  notificationAvatar: { marginLeft: 10 },
  notificationTopCont: {
    paddingVertical: 12,
    flexDirection: "row",
    flex: 1,
  },
  notificationBtnCont: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 55,
    gap: 10,
  },
  notificationAcceptBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    width: 80,
  },
  notificationDeclineBtn: {
    backgroundColor: COLORS.white,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    width: 80,
  },
  notificationDeclineBtnText: {
    fontSize: 12,
    color: COLORS.black,
    textAlign: "center",
  },
  notificationAcceptBtnText: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: "center",
  },
  img: {
    width: 30,
    height: 30,
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
