import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { Platform } from "react-native";
import socket from "../helpers/socket";
const initialNotificationState = {
  notification: null,
  loading: false,
  error: null,
  success: false,
  showNotification: false,
  socketPush: false,
};

const NotificationContext = createContext(initialNotificationState);

export const NotificationContextProvider = ({ children }) => {
  const [notificationState, setNotificationState] = useState(
    initialNotificationState
  );

  const getNotification = async () => {
    setNotificationState({ ...notificationState, loading: true });
    try {
      const res = await axios.get(
        `${
          Platform.OS === "ios"
            ? "http://192.168.0.103:5000"
            : "http://192.168.0.103:5000"
        }/api/v1/shifts/swap`
      );
      setNotificationState({
        ...notificationState,
        notification: res.data,
        loading: false,
        success: true,
      });
    } catch (error) {
      setNotificationState({
        ...notificationState,
        error: error.response.data.error,
        loading: false,
        success: false,
      });
    }
  };

  useEffect(() => {
    socket.on("shiftSwapRequest", (data) => {
      console.log("notification", data);
      setNotificationState({
        ...notificationState,
        socketPush: true,
        showNotification: true,
      });
    });

    return () => {
      socket.off("shiftSwapRequest");
    };
  }, []);

  useEffect(() => {
    if (notificationState.socketPush) {
      getNotification();
    }
  }, [notificationState.socketPush]);

  return (
    <NotificationContext.Provider
      value={{ notificationState, setNotificationState }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
