import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { COLORS } from "../../constant/theme";
import ShiftList from "../../components/ShiftList/ShiftList";
import { shiftData, upComingShiftData } from "../../data/data";
import styles from "./myshift.styles";
import TopBar from "../../components/TopBar/TopBar";
import {
  CalendarProvider,
  WeekCalendar,
  ExpandableCalendar,
  Calendar,
} from "react-native-calendars";
import { useFetchContext } from "../../context/FetchContext";
import { useAuthContext } from "../../context/AuthContext";
import moment from "moment";
const MyShift = () => {
  const { shifts, fetchShiftData, filteredShifts } = useFetchContext();
  const [activeTab, setActiveTab] = useState("Schedule");
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchShiftData();
    // fetchLocationData();
  }, []);

  function generateShiftData(startDate, endDate) {
    const shiftData = {};
    let currentDate = moment(startDate);
    const endDateMoment = moment(endDate);

    while (currentDate.isSameOrBefore(endDateMoment, "day")) {
      const dateString = currentDate.format("YYYY-MM-DD");
      const isStartingDay = currentDate.isSame(startDate, "day");
      const isEndingDay = currentDate.isSame(endDate, "day");

      const shiftDayData = {};

      if (isStartingDay) {
        shiftDayData.startingDay = true;
      }

      if (isEndingDay) {
        shiftDayData.endingDay = true;
      }

      if (!isStartingDay || !isEndingDay) {
        shiftDayData.color = COLORS.primary;
      }

      shiftData[dateString] = shiftDayData;

      currentDate.add(1, "day");
    }

    return shiftData;
  }

  return (
    <>
      <View style={styles.container}>
        {/* TOP BAR CONTAINER */}
        <TopBar name={"My Shift"} link={"HomeScreen"} />

        {/* BUTTON CONTAINER */}
        <View style={styles.btnContainer}>
          <Pressable onPress={() => handleTabPress("Past")}>
            <Text
              style={[
                styles.btnText,
                activeTab === "Past" && styles.leftIsClicked,
              ]}
            >
              All Shifts
            </Text>
          </Pressable>
          <Pressable onPress={() => handleTabPress("Schedule")}>
            <Text
              style={[
                styles.btnText,
                activeTab === "Schedule" && styles.rightIsClicked,
              ]}
            >
              Schedule
            </Text>
          </Pressable>
        </View>
        {/* END BUTTON CONTAINER */}

        {/* LATEST CONTAINER */}
        {activeTab === "Past" && (
          <View style={styles.latestContainer}>
            <Text style={styles.latestText}>Latest</Text>
            {shifts && (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={shifts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <ShiftList
                    name={item.shiftName}
                    location={item.locations[0].locationName}
                    date={item.date}
                    value={item}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 200 }} // Adjust paddingBottom as needed
              />
            )}
          </View>
        )}

        {activeTab === "Schedule" && (
          <View>
            <View style={styles.shiftContainer}>
              <View style={styles.shiftDate}>
                <Text style={styles.shiftDateTitle}>
                  {new Date().toLocaleDateString()}
                </Text>
                {/* <Text style={styles.shiftDateToday}>6 Shift today</Text> */}
              </View>
              {/* <TouchableOpacity onPress={() => setWeekView(!weekView)}> */}
              <Image
                source={require("../../assets/Calendar.png")}
                style={styles.img}
              />
            </View>
          </View>
        )}

        {/* UPCOMING SHIFT CALENDAR CONTAINER */}

        {activeTab === "Schedule" && (
          <View style={styles.latestContainer}>
            <Text style={styles.latestText}>Upcoming Shifts</Text>
            {filteredShifts?.allShifts?.length && (
              <FlatList
                data={filteredShifts.allShifts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <ShiftList
                    name={item.shiftName}
                    location={item.locations[0].locationName}
                    value={item}
                  />
                )}
                ListHeaderComponent={() => (
                  <View>
                    <Calendar
                      markingType="period"
                      markedDates={generateShiftData(
                        filteredShifts.allShifts[0].shiftStartTime,
                        filteredShifts.allShifts[0].shiftEndTime
                      )}
                      enableSwipeMonths={false}
                      hideArrows={true}
                      initialPosition={ExpandableCalendar.positions.CLOSED}
                    />
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 320 }} // Adjust paddingBottom as needed
              />
            )}
          </View>
        )}

        {/* END LATEST CONTAINER */}
      </View>
    </>
  );
};

export default MyShift;
