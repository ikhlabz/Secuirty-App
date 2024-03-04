import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Entry from "../../screens/Entry/EntryScreen";
import Home from "../../screens/Home/Home";
import Login from "../../screens/Login/Login";
import Splash from "../../screens/Splash/Splash";
import Register from "../../screens/Register/Register";
import { Patrolling } from "../../screens/Patrolling/Patrolling";
import { UserPatrolling } from "../../screens/Patrolling/UserPatrolling";
import Chat from "../../screens/Chat/Chat";
import Layer from "../../screens/Layer/Layer";
import Schedule from "../../screens/Schedule/Schedule";
import Notification from "../../screens/Notification/Notification";
import { COLORS } from "../../constant/theme";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import chatIcon from "../../assets/Chat.png";
import HomeIcon from "../../assets/Home.png";
import calenderIcon from "../../assets/calendar-icon.png";
import notificationIcon from "../../assets/Notification.png";
import LayerIcon from "../../assets/layer.png";
import MyShift from "../../screens/MyShift/MyShift";
import ShiftDetails from "../../screens/MyShift/ShiftDetails";
import PayDiscrepancy from "../../screens/PayDiscrepancy/PayDiscrepancy";
import BriefingBox from "../../screens/BriefingBox/BriefingBox";
import PayStub from "../../screens/PayStub/PayStub";
import LetterOfEmployment from "../../screens/LetterOfEmployment/LetterOfEmployment";
import EmergencyCall from "../../screens/Emergency/EmergencyCall";
import Supervisior from "../../screens/Supervisior/Supervisior";
import SupervisorShifts from "../../screens/SupervisorShifts/SupervisorShifts";
import SupervisorLocations from "../../screens/SupervisorLocations/SupervisorLocations";
import SupervisorGuards from "../../screens/SupervisorGuards/SupervisorGuards";
import PanicButton from "../../screens/Panic/PanicButton";
import IncidentReporting from "../../screens/IncidentReporting/IncidentReporting";
import BannedAndTresspassed from "../../screens/BannedAndTressPassed/BannedAndTresspassed";
import LostAndFound from "../../screens/LostAndFound/LostAndFound";
import ReturnAndPickup from "../../screens/ReturnAndPickup/ReturnAndPickup";
import AllShifts from "../../screens/SupervisorStack/Shifts/Shifts";
import AllGuards from "../../screens/SupervisorStack/Guards/Guards";
import AllLocations from "../../screens/SupervisorStack/Locations/Locations";
import AllPatrollings from "../../screens/SupervisorStack/Patrollings/Patrollings";
import AllBriefings from "../../screens/SupervisorStack/Briefings/Briefings";
import AllIncidents from "../../screens/SupervisorStack/Incidents/Incidents";
import Scanner from "../../screens/Scanner/Scanner";
import { useAuthContext } from "../../context/AuthContext";
import Security from "../../screens/Security/Security";
import Location from "../../screens/Location/Location";
import Shifts from "../../screens/Shifts/Shifts";
import { usePostContext } from "../../context/PostContext";
import LottieView from "lottie-react-native";
import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const HomeTabs = () => {
  const renderIcon = (source, focused) => (
    <View style={focused ? styles.focusedImg : styles.imgContainer}>
      <Image source={source} style={styles.img} />
    </View>
  );
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: COLORS.bottomBarBg,
            width: "auto",
            height: 100,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          },
        ],
      }}
    >
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(chatIcon, focused),
        }}
      />
      <Tab.Screen
        name="Layer"
        component={Layer}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(LayerIcon, focused),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(HomeIcon, focused),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(calenderIcon, focused),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(notificationIcon, focused),
        }}
      />
    </Tab.Navigator>
  );
};

export const UserDrawer = () => {
  const { logout } = useAuthContext();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: { color: COLORS.textWhite },
        drawerStyle: { backgroundColor: COLORS.bottomBarBg },
        headerStyle: { backgroundColor: COLORS.bottomBarBg },
        headerTintColor: COLORS.textWhite,
        drawerLabelStyle: { color: COLORS.textWhite },
        drawerActiveBackgroundColor: COLORS.primary,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerRight: () => (
            <View style={{ marginRight: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text
                  style={{
                    color: COLORS.textWhite,
                    fontWeight: "normal",
                    fontSize: 16,
                    backgroundColor: COLORS.primary,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Drawer.Screen name="Incident Reporting" component={IncidentReporting} />
    </Drawer.Navigator>
  );
};

export const SupervisorDrawer = () => {
  const { logout } = useAuthContext();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: { color: COLORS.textWhite },
        drawerStyle: { backgroundColor: COLORS.bottomBarBg },
        headerStyle: { backgroundColor: COLORS.bottomBarBg },
        headerTintColor: COLORS.textWhite,
        drawerLabelStyle: { color: COLORS.textWhite },
        drawerActiveBackgroundColor: COLORS.primary,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerRight: () => (
            <View style={{ marginRight: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "normal",
                    fontSize: 16,
                    backgroundColor: COLORS.primary,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen name="Incident Reporting" component={IncidentReporting} />
      <Drawer.Screen name="Shifts" component={SupervisorShifts} />
      <Drawer.Screen name="Guards" component={SupervisorGuards} />
      <Drawer.Screen name="Locations" component={SupervisorLocations} />
    </Drawer.Navigator>
  );
};

export const MainNavigator = () => {
  const { user, isSuperVisor, loading } = useAuthContext();
  const { isLoading } = usePostContext();
  return (
    <>
      {Platform.OS === "ios" ? (
        <View style={{ marginTop: 60 }}></View>
      ) : (
        <StatusBar />
      )}
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Scanner" component={Scanner} />
        {!user ? (
          <>
            <Stack.Screen name="Entry" component={Entry} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <Stack.Screen
            name="Drawer"
            component={isSuperVisor ? SupervisorDrawer : UserDrawer}
          />
        )}

        <Stack.Group>
          <Stack.Screen name="PatrollingScreen" component={Patrolling} />
          <Stack.Screen
            name="UserPatrollingScreen"
            component={UserPatrolling}
          />
          <Stack.Screen name="BriefingBox" component={BriefingBox} />
          <Stack.Screen name="PayStub" component={PayStub} />
          <Stack.Screen
            name="LetterOfEmployment"
            component={LetterOfEmployment}
          />
          <Stack.Screen name="MyShift" component={MyShift} />
          <Stack.Screen name="ShiftDetails" component={ShiftDetails} />
          <Stack.Screen name="PayDiscrepancy" component={PayDiscrepancy} />
          <Stack.Screen name="EmergencyCalls" component={EmergencyCall} />
          <Stack.Screen name="PanicButton" component={PanicButton} />
          <Stack.Screen name="ShiftsScreen" component={AllShifts} />
          <Stack.Screen name="GuardsScreen" component={AllGuards} />
          <Stack.Screen name="LocationsScreen" component={AllLocations} />
          <Stack.Screen name="PatrollingsScreen" component={AllPatrollings} />
          <Stack.Screen name="BriefingsScreen" component={AllBriefings} />
          <Stack.Screen name="IncidentsScreen" component={AllIncidents} />
          <Stack.Screen
            name="BannedAndTresspassed"
            component={BannedAndTresspassed}
          />
          <Stack.Screen name="LostAndFound" component={LostAndFound} />
          <Stack.Screen name="ReturnAndPickup" component={ReturnAndPickup} />
          <Stack.Screen
            name="IncidentReporting"
            component={IncidentReporting}
          />
        </Stack.Group>
      </Stack.Navigator>
      {loading || isLoading ? (
        <LottieView
          style={{ flex: 1, backgroundColor: COLORS.animationBg }}
          source={require("../../assets/Animation/Animation-1706039916997.json")}
          autoPlay
        />
      ) : null}
    </>
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
