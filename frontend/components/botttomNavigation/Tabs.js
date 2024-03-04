import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "../../screens/Chat/Chat";
import Layer from "../../screens/Layer/Layer";
import Route from "../Routes/route";
import Schedule from "../../screens/Schedule/Schedule";
import Notification from "../../screens/Notification/Notification";
import { COLORS } from "../../constant/theme";
import chatIcon from "../../assets/Chat.png";
import HomeIcon from "../../assets/Home.png";
import LayerIcon from "../../assets/layer.png";
import notificationIcon from "../../assets/Notification.png";
import calenderIcon from "../../assets/calendar-icon.png";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const renderChatIcon = ({ focused }) => (
    <View style={focused ? styles.focusedImg : styles.imgContainer}>
      <Image source={chatIcon} style={styles.img} />
    </View>
  );

  const renderHomeIcon = ({ focused }) => (
    <View style={focused ? styles.focusedImg : styles.imgContainer}>
      <Image source={HomeIcon} style={styles.img} />
    </View>
  );
  const renderLayerIcon = ({ focused }) => (
    <View style={focused ? styles.focusedImg : styles.imgContainer}>
      <Image source={LayerIcon} style={styles.img} />
    </View>
  );
  const renderNotificationIcon = ({ focused }) => (
    <View style={focused ? styles.focusedImg : styles.imgContainer}>
      <Image source={notificationIcon} style={styles.img} />
    </View>
  );

  const renderCalenderIcon = ({ focused }) => (
    <View style={focused ? styles.focusedImg : styles.imgContainer}>
      <Image source={calenderIcon} style={styles.img} />
    </View>
  );

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.black,
          width: "auto",
          height: 80,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: renderChatIcon,
        }}
      />
      <Tab.Screen
        name="Layer"
        component={Layer}
        options={{
          tabBarIcon: renderLayerIcon,
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={Route}
        options={{
          tabBarIcon: renderHomeIcon,
        }}
      />
      {/* <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: renderCalenderIcon,
        }}
      /> */}
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: renderNotificationIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
  },
  focusedImg: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 100,
  },
});

export default Tabs;
