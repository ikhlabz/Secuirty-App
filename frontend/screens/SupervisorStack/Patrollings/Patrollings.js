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
import styles from "./patrollings.style";
import TopBar from "../../../components/TopBar/TopBar";
import { useFetchContext } from "../../../context/FetchContext";

const Patrollings = () => {
  const { fetchPatrollingData, patrollings } = useFetchContext();
  useEffect(() => {
    fetchPatrollingData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar name="All Patrollings" link="HomeScreen" />
      <View style={styles.dataCont}>
        {patrollings && (
          <FlatList
            data={patrollings}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.patrollingName}</Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Patrollings;
