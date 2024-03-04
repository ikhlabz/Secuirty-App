import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import lunchBtn from "../../assets/lunch-btn.png";
import shiftBtn from "../../assets/shift-btn.png";
import intro from "../../assets/intro.png";
import { Entypo } from "@expo/vector-icons";
import styles from "./home.styles";
import HomeOptions from "../../components/homeOptions/HomeOptions";
import { homeOptionsdata, supervisiorHomeOptions } from "../../data/data";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import * as Location from "expo-location";
import isWithinRadius from "../../helpers";
import { useAuthContext } from "../../context/AuthContext";
// import * as Device from "expo-device";s
import socket from "../../helpers/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetchContext } from "../../context/FetchContext";
import axios from "axios";
import { usePostContext } from "../../context/PostContext";

const Home = () => {
  const { user, isSuperVisor, token, logout } = useAuthContext();
  const {
    shifts,
    fetchShiftData,
    setFilteredShifts,
    filteredShifts,
    assignedShift,
  } = useFetchContext();
  const { checkInGuard, checkOutGuard } = usePostContext();
  const navigation = useNavigation();

  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [shiftStarted, setShiftStarted] = useState(false);
  const [startLunch, setStartLunch] = useState(false);
  const { firstName, lastName } = user;

  const routesLength = useNavigationState((state) => state.routes);
  console.log("routesLength", routesLength);

  useEffect(() => {
    (async () => {
      let id = await AsyncStorage.getItem("dailyShiftId");
      if (id != null) {
        setShiftStarted(true);
      }
    })();
  }, []);

  useEffect(() => {
    fetchShiftData();
  }, []);

  const checkStartTimer = () => {
    if (filteredShifts?.currentShift) {
      // only allow start shift before the 30 minutes of the shift start time
      const shiftStartTime = new Date(
        filteredShifts.currentShift.shiftStartTime
      );
      const currentTime = new Date();

      const diff = shiftStartTime - currentTime;
      const minutes = Math.floor(diff / 60000);
      if (minutes < 30) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkEndTimer = () => {
    const shiftEndTime = new Date(filteredShifts.currentShift.shiftEndTime);
    const currentTime = new Date();

    // Extract hours and minutes from the shift end time and current time
    const shiftEndHours = shiftEndTime.getHours();
    const shiftEndMinutes = shiftEndTime.getMinutes();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const shiftEndTimeAMPM = shiftEndHours >= 12 ? "PM" : "AM";
    const currentHoursAMPM = currentHours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const shiftEndHours12 = shiftEndHours % 12 || 12;
    const currentHours12 = currentHours % 12 || 12;

    // Calculate the time difference in minutes
    let diffHours = shiftEndHours12 - currentHours12;
    let diffMinutes = shiftEndMinutes - currentMinutes;

    // Adjust the difference if it crosses over the 12-hour boundary
    if (
      currentHours > shiftEndHours ||
      (currentHours === shiftEndHours && currentMinutes > shiftEndMinutes)
    ) {
      diffHours += 12;
    }

    // Convert negative difference to positive if necessary
    if (diffHours < 0) {
      diffHours += 12;
    }
    const totalDiffMinutes = diffHours * 60 + diffMinutes;

    return totalDiffMinutes;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          LocationActivityType: Location.ActivityType.OtherNavigation,
          maximumAge: 5000,
          timeout: 15000,
        });
        console.log("location approved", location);
        setLocation(location);
        sendLocationToServer(location);
      } catch {
        let location = await Location.getLastKnownPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          LocationActivityType: Location.ActivityType.OtherNavigation,
          maxAge: 5000,
          timeout: 15000,
        });
        console.log("location", location);
        setLocation(location);
        sendLocationToServer(location);
      }
    })();
  }, []);

  const startShift = () => {
    if (checkStartTimer()) {
      try {
        checkInGuard({
          shiftId: filteredShifts?.currentShift?._id,
          guardId: user._id,
          checkInTime: Date.now(),
        });
        setShiftStarted(true);
      } catch {}
    } else {
      Alert.alert(
        "Start Shift",
        "You can only start your shift 30 minutes before the shift start time",
        [
          {
            text: "OK",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const sendLocationToServer = async (data) => {
    const { latitude, longitude } = data.coords;
    console.log("location", latitude, longitude);

    if (Platform.OS !== "ios") {
      baseUrl = "http://147.182.235.79:5000";
    } else {
      baseUrl = "http://147.182.235.79:5000";
    }

    const response = await fetch(
      `${baseUrl}/api/v1/users/update-location/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Origin": "Whitelisted Origin",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude,
        }),
      }
    );
    const res = await response.json();
    console.log(res.data);
  };

  const patrollingRadius = 3000;

  useEffect(() => {
    if (location !== null) {
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      const patrollingCenter = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const isWithinPatrollingRadius = isWithinRadius(
        userLocation,
        patrollingCenter,
        patrollingRadius
      );
      console.log(isWithinPatrollingRadius, "isWithinPatrollingRadius");

      if (!isWithinPatrollingRadius) {
        schedulePushNotification();
      }
    }
  }, [location]);

  const onHandleEndShift = () => {
    let minutes = checkEndTimer();
    let time = minutes > 60 ? minutes / 60 : minutes;
    if (minutes < 0) {
      setShiftStarted(false);
      checkOutGuard({
        shiftId: filteredShifts?.currentShift?._id,
        guardId: user._id,
        checkOutTime: Date.now(),
      });
    } else {
      Alert.alert(
        "End Shift",
        `You're Ending your Shift ${Math.floor(time)} Hours and ${
          time.toFixed(2).split(".")[1]
        } Minutes Before`,
        [
          {
            text: "OK",
            onPress: () => {
              checkOutGuard({
                shiftId: filteredShifts?.currentShift?._id,
                guardId: user._id,
                checkOutTime: Date.now(),
              });
              setShiftStarted(false);
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    if (shifts !== null) {
      let filteredShifts = [];
      shifts.forEach((shift) => {
        if (shift.assignedGuards.length > 0) {
          shift.assignedGuards.forEach((guard) => {
            if (guard === user._id) {
              filteredShifts.push(shift);
            }
          });
        }
      });
      if (filteredShifts.length > 0) {
        setFilteredShifts(filteredShifts);
      }
    }
  }, [shifts, user._id]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* USER INTRO */}
        <View style={styles.introContainer}>
          <View>
            <View>
              <Text style={styles.name}>
                {firstName} {lastName}
              </Text>
              <Text style={styles.areaUnit}>
                Priority Security:{" "}
                {filteredShifts?.currentShift
                  ? filteredShifts?.currentShift?.locations[0]?.locationName?.split(
                      ","
                    )[0]
                  : "No Shift Assigned"}
              </Text>
              {/* <Text style={styles.areaUnit}>Mobile Patrol - Patrol Unit</Text> */}
              <Text style={styles.areaUnit}>
                Current Location -{" "}
                {location
                  ? `${location?.coords?.latitude}, ${location?.coords?.longitude}`
                  : " Loading..."}
              </Text>
            </View>
          </View>
          <View style={styles.imgContainer}>
            {isSuperVisor ? (
              <Image
                source={{
                  uri: user?.userImage?.url,
                }}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={{
                  uri: user?.securityGuardImage?.url,
                }}
                style={styles.avatar}
              />
            )}
          </View>
        </View>

        {!isSuperVisor && (
          <View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.btn}
                onPress={
                  (filteredShifts?.currentShift &&
                    (shiftStarted ? onHandleEndShift : startShift)) ||
                  (filteredShifts?.currentShift &&
                    (shiftStarted ? onHandleEndShift : startShift))
                }
                disabled={!filteredShifts?.currentShift}
              >
                {filteredShifts?.currentShift ? (
                  <>
                    <Image source={shiftBtn} style={styles.img} />
                    <Text style={styles.btnText}>
                      {shiftStarted ? "End Shift" : "Start Shift"}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.btnText}>No Shift Assigned</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setStartLunch(!startLunch)}
              >
                <Image source={lunchBtn} style={styles.img} />
                <Text style={styles.btnText}>
                  {startLunch ? "End Lunch" : "Start Lunch"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Home options */}
        <View
          style={
            isSuperVisor
              ? [styles.homeOptions, { marginTop: 30 }]
              : styles.homeOptions
          }
        >
          {!isSuperVisor &&
            homeOptionsdata.map((item, index) => (
              <HomeOptions
                key={index}
                title={item.title}
                source={item.image}
                link={item.link}
              />
            ))}
          {isSuperVisor &&
            supervisiorHomeOptions.map((item, index) => (
              <HomeOptions
                key={index}
                title={item.title}
                source={item.image}
                link={item.link}
              />
            ))}
        </View>
      </ScrollView>
      {/* <HomeTabs /> */}
    </SafeAreaView>
  );
};

export default Home;
