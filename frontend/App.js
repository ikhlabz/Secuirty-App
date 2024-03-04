import "react-native-gesture-handler";
import React from "react";
import { MainNavigator } from "./components/Routes/route";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "./context/AuthContext";
import { PostContextProvider } from "./context/PostContext";
import { FetchContextProvider } from "./context/FetchContext";
import * as Linking from "expo-linking";
import { Text } from "react-native";
import { NotificationContextProvider } from "./context/NotificationContext";

export default function App() {
  console.log("APP");
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <FetchContextProvider>
          <NotificationContextProvider>
            <PostContextProvider>
              <MainNavigator />
            </PostContextProvider>
          </NotificationContextProvider>
        </FetchContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
