import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import styles from "./locations.style";
import TopBar from "../../../components/TopBar/TopBar";
import { useFetchContext } from "../../../context/FetchContext";

const Locations = () => {
  const { fetchLocationData, locations } = useFetchContext();
  useEffect(() => {
    fetchLocationData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar name="All Locations" link="HomeScreen" />
      <View style={styles.dataCont}>
        {locations && (
          <FlatList
            data={locations}
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

export default Locations;
