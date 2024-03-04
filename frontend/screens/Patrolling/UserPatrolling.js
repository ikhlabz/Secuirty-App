import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import styles from "./partolling.styles";
import { Entypo } from "@expo/vector-icons";
import checkPoint from "../../assets/checkpoint.png";
import { useNavigation } from "@react-navigation/native";
import Checkpoint from "../../components/Checkpoint/Checkpoint";
import TopBar from "../../components/TopBar/TopBar";
import { useFetchContext } from "../../context/FetchContext";
import { useAuthContext } from "../../context/AuthContext";
import { COLORS } from "../../constant/theme";

export const UserPatrolling = () => {
  const [showCheckPoints, setShowCheckPoints] = React.useState(false);
  const [filteredPatrolling, setFilteredPatrolling] = React.useState([]);
  const [filteredCheckpoints, setFilteredCheckpoints] = React.useState([]);
  const navigation = useNavigation();
  const handlePressPatrol = () => {
    !showCheckPoints ? setShowCheckPoints(true) : setShowCheckPoints(false);
  };

  const { fetchPatrollingData, patrollings } = useFetchContext();
  const { user } = useAuthContext();

  useEffect(() => {
    fetchPatrollingData();
  }, []);

  useEffect(() => {
    if (patrollings !== null) {
      let filteredCheckpoints = [];
      let filteredPatrollings = []; // Temporary array to accumulate filtered checkpoints

      patrollings.forEach((patrolling) => {
        if (patrolling.assingedTo.length > 0) {
          patrolling.assingedTo.forEach((guard) => {
            if (guard.email === user.email) {
              filteredPatrollings.push(patrolling);
              patrolling.patrollingCheckpoints.forEach((checkpoint) => {
                filteredCheckpoints.push(checkpoint); // Accumulate filtered checkpoints
              });
            }
          });
        }
      });

      setFilteredCheckpoints(filteredCheckpoints); // Update state after the loop
      setFilteredPatrolling(filteredPatrollings);
    }
  }, [patrollings, user.email]);

  console.log("FILTERED Checkpoints: ", filteredCheckpoints);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {/* TOP BAR CONTAINER */}
        <TopBar name={"Patrollings"} link={"HomeScreen"} />
        <View style={[styles.iconContainer, { marginVertical: 20 }]}>
          <Text style={styles.checkText}>Patrollings</Text>
        </View>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 20 }}>
              <View style={{ marginBottom: 200 }}>
                {filteredPatrolling.length
                  ? filteredPatrolling.map((patrolling, i) => {
                      console.log(patrolling);
                      return (
                        <Pressable
                          key={i}
                          onPress={() =>
                            navigation.navigate("PatrollingScreen", {
                              checkpoints: filteredCheckpoints,
                              patrolling: patrolling,
                              patrollingID: patrolling._id,
                            })
                          }
                          style={{
                            width: "90%",
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: COLORS.primary,
                            alignSelf: "center",
                            marginVertical: 10,
                          }}
                        >
                          <Text style={{ fontSize: 14 }}>
                            {patrolling.patrollingArea.locationName}
                          </Text>
                          <Text
                            style={{
                              marginVertical: 5,
                              fontSize: 18,
                              color: COLORS.primary,
                            }}
                          >
                            {patrolling.patrollingName}
                          </Text>
                          <Text style={{ fontSize: 14 }}>
                            Patrolling Checkpoints:
                            {patrolling.patrollingCheckpoints?.length}
                          </Text>
                        </Pressable>
                      );
                    })
                  : null}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
