import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./notification.styles";
import { useNotification } from "../../context/NotificationContext";

const Notification = () => {
  const { notificationState } = useNotification();
  console.log(notificationState);
  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <View style={styles.notificationTopCont}>
          <Avatar.Icon
            size={50}
            style={styles.notificationAvatar}
            icon={<FontAwesome name="user" size={24} color="black" />}
          />
          <Text style={styles.notificationMsg}>Message</Text>
        </View>
        <View style={styles.notificationBtnCont}>
          <TouchableOpacity style={styles.notificationAcceptBtn}>
            <Text style={styles.notificationAcceptBtnText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationDeclineBtn}>
            <Text style={styles.notificationDeclineBtnText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Notification;
