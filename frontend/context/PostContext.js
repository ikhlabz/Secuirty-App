import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { forwardRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const INITIAL_STATES = {
  isLoading: null,
  response: null,
  errorResponse: null,
  isError: null,
};

export const PostContext = createContext(INITIAL_STATES);

export const PostContextProvider = ({ children }) => {
  const [postState, setPostState] = useState(INITIAL_STATES);
  const { user, token } = useAuthContext();
  const navigation = useNavigation();

  const baseUrl = "http://147.182.235.79:5000";

  const PostGuardData = async (formData) => {
    setPostState({ ...postState, isLoading: true });
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/users/register/guard`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            //prettier-ignore
            "Origin": "Whitelisted Origin",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setPostState({
          ...postState,
          response: data.message,
        });
        // navigation.navigate("Drawer");
      } else {
        setPostState({ ...postState, isError: true });
      }
    } catch (error) {
      setPostState({ ...postState, isError: true });
      console.log(error);
    } finally {
      setPostState({
        ...postState,
        isLoading: false,
      });
    }
  };
  const PostShiftData = async (formData) => {
    setPostState({ ...postState, isLoading: true });
    formData = { ...formData, createdBy: user._id };
    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/shifts`, formData, {
        headers: {
          "Content-Type": "application/json",
          Origin: "Whitelisted Origin",
          //prettier-ignore
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log("Sending Data", data);
      if (data.success) {
        setPostState({
          ...postState,
          response: data.message,
        });
        fetchShiftData();
      } else {
        setPostState({ ...postState, isError: true });
      }
    } catch (error) {
      setPostState({ ...postState, isError: true });
      console.log(error);
    } finally {
      setPostState({
        ...postState,
        isLoading: false,
      });
    }
  };
  const PostIncidentData = async (formData) => {
    setPostState({ ...postState, isLoading: true });
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/misc/post-incidents`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Origin: "Whitelisted Origin",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Normal RESULTS: ", data);
      if (data.success) {
        console.log("SUCCESS RESULTS: ", data);
        setPostState({
          ...postState,
          response: data.message,
        });
      } else {
        setPostState({ ...postState, isError: true });
      }
    } catch (error) {
      setPostState({ ...postState, isError: true });
      console.log(error);
    } finally {
      setPostState({
        ...postState,
        isLoading: false,
      });
    }
  };
  const PostBriefingData = async (formData) => {
    setPostState({ ...postState, isLoading: true });
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/briefing/post-brief`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Origin: "Whitelisted Origin",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Normal RESULTS: ", data);
      if (data.success) {
        console.log("SUCCESS RESULTS: ", data);
        setPostState({
          ...postState,
          response: data.message,
        });
      } else {
        setPostState({ ...postState, isError: true });
      }
    } catch (error) {
      setPostState({ ...postState, isError: true });
      console.log(error);
    } finally {
      setPostState({
        ...postState,
        isLoading: false,
      });
    }
  };
  const checkInGuard = async (formData) => {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/shifts/checkin`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Origin: "Whitelisted Origin",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      console.log("CHECK IN SUCCESS: ", data);
      await AsyncStorage.setItem("dailyShiftId", data.data._id);
    } else {
      console.log("CHECK IN FAILED: ", data);
    }
  };
  const checkOutGuard = async (formData) => {
    let id = await AsyncStorage.getItem("dailyShiftId");
    formData = { ...formData, dailyShiftId: id };
    const { data } = await axios.put(
      `${baseUrl}/api/v1/shifts/checkout/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Origin: "Whitelisted Origin",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      console.log("CHECK OUT SUCCESS: ", data);
      await AsyncStorage.removeItem("dailyShiftId");
    } else {
      console.log("CHECK OUT FAILED: ", data);
    }
  };

  return (
    <PostContext.Provider
      value={{
        ...postState,
        PostGuardData,
        PostShiftData,
        PostIncidentData,
        PostBriefingData,
        checkInGuard,
        checkOutGuard,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
