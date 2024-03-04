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
import styles from "./shiftDetails.styles";
import TopBar from "../../components/TopBar/TopBar";
import axios from "axios";
import { useFetchContext } from "../../context/FetchContext";
import { useAuthContext } from "../../context/AuthContext";
const ShiftDetails = ({ route }) => {
  const { token } = useAuthContext();
  const { shiftId } = route.params;
  const [shiftDetails, setShiftDetails] = useState([]);
  if (Platform.OS === "android") {
    baseUrl = "http://147.182.235.79:5000";
  } else {
    baseUrl = "http://147.182.235.79:5000";
  }
  const getData = async () => {
    if (token) {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/v1/shifts/${shiftId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Origin: "Whitelisted Origin",
            },
          }
        );
        if (data.success) {
          setShiftDetails(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSwap = () => {};
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {/* TOP BAR CONTAINER */}
        <TopBar name={"Shift Details"} link={"MyShift"} />

        {/* BUTTON CONTAINER */}
        <Pressable
          style={[
            styles.btnContainer,
            {
              backgroundColor: shiftDetails._id ? COLORS.primary : COLORS.gray2,
            },
          ]}
          onPress={handleSwap}
        >
          <Text style={styles.btnText}>Swap Shift</Text>
        </Pressable>
        {/* END BUTTON CONTAINER */}

        <View>
          {/* SHIFT DETAILS CONTAINER */}
          {shiftDetails._id && (
            <View style={styles.detailsContainer}>
              <View style={styles.detailsCol}>
                <View style={styles.detailsLeftSide}>
                  <Text>Shift Name:</Text>
                </View>
                <View style={styles.detailsRightSide}>
                  <Text>{shiftDetails.shiftName}</Text>
                </View>
              </View>
              <View style={styles.detailsCol}>
                <View style={styles.detailsLeftSide}>
                  <Text>Location Name:</Text>
                </View>
                <View style={styles.detailsRightSide}>
                  <Text>{shiftDetails.locations[0].locationName}</Text>
                </View>
              </View>
              <View style={styles.detailsCol}>
                <View style={styles.detailsLeftSide}>
                  <Text>Shift Start-Time:</Text>
                </View>
                <View style={styles.detailsRightSide}>
                  <Text>
                    {new Date(shiftDetails.shiftStartTime).toLocaleString()}
                  </Text>
                </View>
              </View>
              <View style={styles.detailsCol}>
                <View style={styles.detailsLeftSide}>
                  <Text>Shift End-Time:</Text>
                </View>
                <View style={styles.detailsRightSide}>
                  <Text>
                    {new Date(shiftDetails.shiftEndTime).toLocaleString()}
                  </Text>
                </View>
              </View>
              <View style={styles.detailsCol}>
                <View style={styles.detailsLeftSide}>
                  <Text>Lunch Start-Time:</Text>
                </View>
                <View style={styles.detailsRightSide}>
                  <Text>{shiftDetails.lunchStartTime}</Text>
                </View>
              </View>
              <View style={styles.detailsCol}>
                <View style={styles.detailsLeftSide}>
                  <Text>Lunch End-Time:</Text>
                </View>
                <View style={styles.detailsRightSide}>
                  <Text>{shiftDetails.lunchEndTime}</Text>
                </View>
              </View>
              <View style={styles.detailsCol}>
                <View style={styles.detailsLeftSide}>
                  <Text>Assigned Guards:</Text>
                </View>
                <View style={styles.detailsRightSide}>
                  <Text>
                    {shiftDetails.assignedGuards.length
                      ? shiftDetails.assignedGuards.map((guard, i) => (
                          <Text key={i}>
                            {guard.firstName} {guard.lastName},{" "}
                          </Text>
                        ))
                      : "--"}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default ShiftDetails;

// {activeTab === "Schedule" && (
//   <View style={styles.upComingContainer}>
//     <Text style={styles.upcomingText}>Up Coming Shift</Text>
//     <FlatList
//       data={upComingShiftData}
//       renderItem={({ item }) => (
//         <ShiftList
//           name={item.name}
//           location={item.location}
//           date={item.date}
//         />
//       )}
//       keyExtractor={(item) => item.id.toString()}
//     />
//   </View>
// )}
