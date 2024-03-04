import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";

const initialAuthState = {
  isSuperVisor: null,
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
  loading: false,
  success: false,
  guardLocation: null,
};
const AuthContext = createContext(initialAuthState);

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);
  let baseUrl = "http://147.182.235.79:5000";

  const navigation = useNavigation();

  const setSupervisor = (value) => {
    setAuthState({ ...authState, isSuperVisor: value });
  };

  const login = async (credentials) => {
    const url = `${baseUrl}/api/v1/users/${
      authState.isSuperVisor ? "login" : "login/guard"
    }`;
    setAuthState({ ...authState, loading: true, error: null });
    try {
      const { data } = await axios.post(url, credentials, {
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Origin": "Whitelisted Origin",
        },
      });
      const {
        data: { refreshToken },
      } = data;
      if (data.success) {
        await AsyncStorage.setItem("refreshToken", refreshToken);
        const value = await AsyncStorage.getItem("refreshToken");
        if (value !== null) {
          loadUser();
          setAuthState({
            ...authState,
            loading: false,
          });
        }
        setAuthState({
          ...authState,
          loading: false,
        });
      }
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error,
        success: false,
      });
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("refreshToken");
      setAuthState({
        ...authState,
        isLoggedIn: false,
        user: null,
        token: null,
      });
      navigation.navigate("Entry");
    } catch {
      setAuthState({
        ...authState,
        loading: false,
        error: true,
      });
    }
  };

  const loadUser = useCallback(async () => {
    const token = await AsyncStorage.getItem("refreshToken");
    console.log(token);
    if (token) {
      try {
        setAuthState({
          ...authState,
          loading: true,
          token: token,
          error: null,
        });
        const { data } = await axios.get(`${baseUrl}/api/v1/users/me`, {
          headers: {
            Origin: "Whitelisted Origin",
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          const {
            data: {
              user: { userRole },
            },
          } = data;
          setAuthState({
            ...authState,
            isSuperVisor: userRole === "Supervisor" ? true : false,
            isLoggedIn: true,
            user: data.data.user,
            token: token,
            success: true,
            loading: false,
          });
          navigation.reset({
            index: 0,
            routes: [{ name: "Drawer" }],
          });
        }
      } catch (error) {
        setAuthState({
          ...authState,
          loading: false,
          error: null,
          success: false,
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "Entry" }],
        });
        console.log("Error in loadUser Function in AuthContext.js: ", error);
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Entry" }],
      });
      setAuthState({
        ...authState,
        loading: false,
        success: false,
      });
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{ login, logout, loadUser, setSupervisor, ...authState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
