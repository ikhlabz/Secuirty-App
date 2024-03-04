import React from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import styles from "./emergency-calls.style";
import TopBar from "../../components/TopBar/TopBar";
import EmergencyCalls from "../../assets/emergency-call.png";
import Viber from "../../assets/viber.png";

const EmergencyCall = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* TOPBAR CONTAINER */}
      <TopBar name="Emergency Calls" link="HomeScreen" />
      {/* IMAGE CONTAINER */}
      <View style={styles.imgContainer}>
        <Image source={EmergencyCalls} style={styles.img} />
        <Text style={styles.mainText}>Emergency Calls</Text>
      </View>

      <ScrollView>
        <TouchableOpacity
          onPress={() => Linking.openURL("tel:911")}
          style={styles.policeContainer}
        >
          <View>
            <Text style={styles.dept}>police</Text>
            <Text style={styles.num}>911</Text>
          </View>
          <View>
            <Image source={Viber} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("tel:205")}
          style={styles.policeContainer}
        >
          <View>
            <Text style={styles.dept}>Ambulance</Text>
            <Text style={styles.num}>205</Text>
          </View>
          <View>
            <Image source={Viber} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("tel:100")}
          style={styles.policeContainer}
        >
          <View>
            <Text style={styles.dept}>Fire Brigade</Text>
            <Text style={styles.num}>100</Text>
          </View>
          <View>
            <Image source={Viber} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("tel:180")}
          style={styles.policeContainer}
        >
          <View>
            <Text style={styles.dept}>Traffic Police</Text>
            <Text style={styles.num}>180</Text>
          </View>
          <View>
            <Image source={Viber} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("tel:177")}
          style={styles.policeContainer}
        >
          <View>
            <Text style={styles.dept}>Gas Emergency</Text>
            <Text style={styles.num}>177</Text>
          </View>
          <View>
            <Image source={Viber} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("tel:16")}
          style={styles.policeContainer}
        >
          <View>
            <Text style={styles.dept}>Rescue</Text>
            <Text style={styles.num}>16</Text>
          </View>
          <View>
            <Image source={Viber} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyCall;
