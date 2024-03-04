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
import styles from "./guards.style";
import TopBar from "../../../components/TopBar/TopBar";
import { useFetchContext } from "../../../context/FetchContext";

const Guards = () => {
  const { fetchGuardData, guards } = useFetchContext();
  useEffect(() => {
    fetchGuardData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar name="All Guards" link="HomeScreen" />
      <View style={styles.dataCont}>
        {guards && (
          <FlatList
            data={guards}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>
                  {item.firstName} {item.lastName}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Guards;
