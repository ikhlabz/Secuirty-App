import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import axios from "axios"; // Don't forget to import axios

const INTIAL_STATE = {
  user: null,
  loading: false,
  error: null,
  token: null,
  isLoggedIn: false,
  isAdmin: false,
};

export const AuthContext = createContext(INTIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(INTIAL_STATE);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(
        "http://147.182.235.79:5000/api/v1/users/login",
        credentials
      );

      console.log(data);

      setAuthState({
        ...authState,
        loading: false,
        isLoggedIn: true,
        token: data.data.refreshToken,
      });
      // loadUser();
      localStorage.setItem("token", data.data.refreshToken);
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error,
      });
      console.log(error);
    }
  };

  const logout = () => {
    setAuthState({
      ...authState,
      isLoggedIn: false,
      user: null,
      token: null,
    });
    localStorage.removeItem("token");
  };

  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      setAuthState({ ...authState, loading: true });
      try {
        const { data } = await axios.get(
          "http://147.182.235.79:5000/api/v1/users/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log("User details Data", data);
        setAuthState({
          ...authState,
          loading: false,
          isLoggedIn: true,
          user: data.data.user,
          token: localStorage.token,
          isAdmin: data.data.user.userRole === "Admin" ? true : false,
        });
      } catch (error) {
        setAuthState({
          ...authState,
          loading: false,
          error: error,
        });
        console.log(error);
      }
    }
  }, [authState.token]);

  useEffect(() => {
    loadUser();
  }, [authState.token]);

  return (
    <AuthContext.Provider value={{ login, logout, ...authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
