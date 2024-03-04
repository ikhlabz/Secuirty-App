import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import styles from "./partolling.styles";
import { Entypo } from "@expo/vector-icons";
import checkPoint from "../../assets/checkpoint.png";
import { useNavigation } from "@react-navigation/native";
import Checkpoint from "../../components/Checkpoint/Checkpoint";
import TopBar from "../../components/TopBar/TopBar";
import { useFetchContext } from "../../context/FetchContext";
import { useAuthContext } from "../../context/AuthContext";

const { height, width } = Dimensions.get("screen");

export const Patrolling = ({ route }) => {
  const [showCheckPoints, setShowCheckPoints] = React.useState(false);
  const { checkpoints, patrolling, patrollingID } = route.params;

  console.log("Patrolling: ", patrolling);
  console.log("Checkpoints: ", checkpoints);

  const handlePressPatrol = () => {
    !showCheckPoints ? setShowCheckPoints(true) : setShowCheckPoints(false);
  };

  const filteredCheckpoints = checkpoints.filter((checkpoint) =>
    patrolling.patrollingCheckpoints.some(
      (patrollingCheckpoint) => patrollingCheckpoint._id === checkpoint._id
    )
  );

  console.log("Mounted");

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {/* TOP BAR CONTAINER */}
        <TopBar
          name={"Patrolling Checkpoints Screen"}
          link={"UserPatrollingScreen"}
        />

        {/* MIDDLE CONTAINER */}
        <View style={styles.middleContainer}>
          <View style={styles.name}>
            <Text style={styles.text}>
              {patrolling.patrollingName || "Loading"}
            </Text>
            <Text style={styles.text}>
              {patrolling?.patrollingArea?.locationName || "Loading"}
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handlePressPatrol()}
            >
              <Text style={styles.btnText}>
                {!showCheckPoints ? "Start Patrol" : "Pause Patrol"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* PATROLLING CONTAINER */}

        <View style={styles.iconContainer}>
          <Image source={checkPoint} style={styles.img} />
          <Text style={styles.checkText}>checkpoints</Text>
        </View>
        <ScrollView>
          {showCheckPoints && (
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 20 }}>
                <View style={{ marginBottom: 100 }}>
                  {filteredCheckpoints.length > 0 &&
                    filteredCheckpoints.map((checkpoint, index) => {
                      return (
                        <Checkpoint
                          key={index}
                          name={checkpoint.checkpointName}
                          status={checkpoint.completed}
                          qrCode={checkpoint.checkpointQrCode.secure_url}
                          id={checkpoint._id}
                        />
                      );
                    })}
                </View>
              </View>

              <View style={styles.endContainer}>
                <TouchableOpacity
                  onPress={() => handlePressPatrol()}
                  style={styles.endBtn}
                >
                  <Text style={styles.endText}>End Patrol</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
