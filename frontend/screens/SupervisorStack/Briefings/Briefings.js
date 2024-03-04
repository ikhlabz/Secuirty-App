import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import styles from "./brienfings.style";
import TopBar from "../../../components/TopBar/TopBar";
import { useFetchContext } from "../../../context/FetchContext";

const Briefings = () => {
  const { fetchBriefingData, briefings } = useFetchContext();
  useEffect(() => {
    fetchBriefingData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar name="All Briefings" link="HomeScreen" />
      <View style={styles.dataCont}>
        {briefings && (
          <FlatList
            data={briefings}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.locationName}</Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Briefings;
