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
import styles from "./incidents.styles";
import TopBar from "../../../components/TopBar/TopBar";
import { useFetchContext } from "../../../context/FetchContext";

const Incidents = () => {
  const { fetchIncidentData, incidents } = useFetchContext();
  useEffect(() => {
    fetchIncidentData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar name="All Incidents" link="HomeScreen" />
      <View style={styles.dataCont}>
        {incidents && (
          <FlatList
            data={incidents}
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

export default Incidents;
