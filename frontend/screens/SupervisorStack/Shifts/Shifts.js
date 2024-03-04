import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "./shifts.style";
import TopBar from "../../../components/TopBar/TopBar";
import { useFetchContext } from "../../../context/FetchContext";

const Shifts = () => {
  const { shifts, fetchShiftData } = useFetchContext();
  useEffect(() => {
    fetchShiftData();
  }, []);
  console.log(shifts);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar name="All Shifts" link="HomeScreen" />
      <View style={styles.dataCont}>
        {shifts && (
          <FlatList
            data={shifts}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.shiftName}</Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Shifts;
