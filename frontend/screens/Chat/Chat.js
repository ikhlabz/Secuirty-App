import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import socket from "../../helpers/socket";
import { useAuthContext } from "../../context/AuthContext";
import { COLORS } from "../../constant/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuthContext();

  const scrollViewRef = useRef();

  useEffect(() => {
    socket.on("message", (messageData) => {
      if (messageData.id === user._id) {
        setMessages((prevMessages) => {
          saveTexts([...prevMessages, messageData]);
          return [...prevMessages, messageData];
        });
      }
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const saveTexts = async (msg) => {
    let url = `userTexts-${user._id}`;
    console.log(msg);
    try {
      const jsonValue = JSON.stringify(msg);
      await AsyncStorage.setItem(url, jsonValue);
    } catch (err) {}
  };

  const getMessages = async () => {
    let url = `userTexts-${user._id}`;
    try {
      const jsonValue = await AsyncStorage.getItem(url);
      let data = jsonValue !== null ? JSON.parse(jsonValue) : [];
      setMessages(data);
    } catch (err) {
      console.log("Error in Reading Data: ", err);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.gray,
          borderBottomWidth: 2,
          borderColor: COLORS.black,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontStyle: "italic",
            fontWeight: "bold",
            color: COLORS.black,
            textTransform: "uppercase",
          }}
        >
          Messages
        </Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        style={{
          flex: 1,
          backgroundColor: COLORS.lightWhite,
          marginBottom: 80,
        }}
      >
        {messages?.map((message, i) => {
          return (
            <View
              key={i}
              style={{
                maxWidth: "80%",
                flexDirection: "row",
                padding: 10,
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  width: "25%",
                  backgroundColor: "transparent",
                  height: "auto",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <View
                  style={{
                    height: 75,
                    width: 75,
                    padding: 10,
                    backgroundColor: COLORS.white,
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={require("../../assets/Logo.png")}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "75%",
                  backgroundColor: COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: COLORS.white,
                  height: "auto",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  marginLeft: 10,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18, color: COLORS.lightWhite }}>
                    {message.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 5,
                      color: COLORS.lightWhite,
                      verticalAlign: "middle",
                    }}
                  >
                    {new Date(message.timeStamp).toLocaleTimeString()}
                  </Text>
                </View>

                <Text
                  style={{ fontSize: 15, color: COLORS.black, marginTop: 5 }}
                >
                  {message.message}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Chat;
