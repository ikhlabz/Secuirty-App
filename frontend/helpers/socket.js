import { io } from "socket.io-client";
import { Platform } from "react-native";
let baseUrl;

if (Platform.OS === "android") {
  baseUrl = "http://147.182.235.79:5000";
} else {
  baseUrl = "http://147.182.235.79:5000";
}
const socket = io(baseUrl);
export default socket;
