import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
import { Platform } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const INITIAL_STATES = {
  reportFields: null,
  shifts: null,
  filteredShifts: null,
  locations: null,
  patrollings: null,
  assignedShift: null,
  briefings: null,
  guards: null,
  incidents: null,
  isLoading: null,
  response: null,
  errorResponse: null,
  isError: null,
};

export const FetchContext = createContext(INITIAL_STATES);

export const FetchContextProvider = ({ children }) => {
  const [dataState, setDataState] = useState(INITIAL_STATES);
  const [reportFields, setReportFields] = useState([]);
  const [locations, setLocations] = useState([]);
  const { user, token, isSuperVisor } = useAuthContext();
  const navigation = useNavigation();

  const baseUrl = "http://147.182.235.79:5000";

  const setFilteredShifts = (shifts) => {
    if (shifts.length === 1) {
      setDataState({
        ...dataState,
        filteredShifts: { allShifts: shifts, currentShift: shifts[0] },
        assignedShift: shifts[0],
      });
    } else {
      const currentTime = moment();
      let currentShift = "";
      const foundShift = shifts.find((shift) => {
        const shiftStartTime = moment(shift.shiftStartTime);
        const shiftEndTime = moment(shift.shiftEndTime);
        return currentTime.isBetween(shiftStartTime, shiftEndTime, null, "[]");
      });
      currentShift = foundShift;
      setDataState({
        ...dataState,
        filteredShifts: {
          allShifts: shifts,
          currentShift: currentShift,
        },
      });
    }
  };
  const GetReportFields = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/misc/get-reportfields`,
        {
          headers: {
            //prettier-ignore
            "Origin": "Whitelisted Origin",
          },
        }
      );
      if (data.success) {
        setReportFields(data.data);
        setDataState({
          ...dataState,
          reportFields: data.data,
          response: data.message,
        });
      }
    } catch (error) {
      setDataState({ ...dataState, isError: true });
      console.log(error);
    }
  };
  const fetchShiftData = async () => {
    if (token) {
      try {
        const { data } = await axios.get(`${baseUrl}/api/v1/shifts`, {
          headers: {
            Origin: "Whitelisted Origin",
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          setDataState({ ...dataState, shifts: data.data });
        }
      } catch (error) {
        console.error("Error fetching Location data:", error);
      }
    }
  };
  const fetchLocationData = async () => {
    if (token) {
      try {
        const { data } = await axios.get(`${baseUrl}/api/v1/locations`, {
          headers: {
            Origin: "Whitelisted Origin",
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          setLocations(data.data);
          setDataState({ ...dataState, locations: data.data });
        }
      } catch (error) {
        console.error("Error fetching Location data:", error);
      }
    }
  };
  const fetchPatrollingData = async () => {
    if (token) {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/v1/patrolling/get-patrolling`,
          {
            headers: {
              Origin: "Whitelisted Origin",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          setDataState({ ...dataState, patrollings: data.data });
        }
      } catch (error) {
        console.error("Error fetching Patrolling data:", error);
      }
    }
  };
  const fetchGuardData = async () => {
    if (token) {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/v1/users/admin/users`,
          {
            headers: {
              Origin: "Whitelisted Origin",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          setDataState({ ...dataState, guards: data.data.guards });
        }
      } catch (error) {
        console.error("Error fetching Guards data:", error);
      }
    }
  };
  const fetchBriefingData = async () => {
    if (token) {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/v1/briefing/get-brief`,
          {
            headers: {
              Origin: "Whitelisted Origin",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          setDataState({ ...dataState, briefings: data.data.guards });
        }
      } catch (error) {
        console.error("Error fetching Briefing data:", error);
      }
    }
  };
  const fetchIncidentData = async () => {
    if (token) {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/v1/misc/get-incident/`,
          {
            headers: {
              Origin: "Whitelisted Origin",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          setDataState({ ...dataState, incidents: data.data });
        }
      } catch (error) {
        console.error("Error fetching Inicident data:", error);
      }
    }
  };

  useEffect(() => {
    GetReportFields();
  }, []);
  useEffect(() => {
    fetchLocationData();
  }, []);
  useEffect(() => {
    fetchShiftData();
  }, []);
  useEffect(() => {
    fetchPatrollingData();
  }, []);
  useEffect(() => {
    isSuperVisor && fetchGuardData();
  }, []);
  useEffect(() => {
    fetchBriefingData();
  }, []);
  useEffect(() => {
    isSuperVisor && fetchIncidentData();
  }, []);

  return (
    <FetchContext.Provider
      value={{
        ...dataState,
        GetReportFields,
        fetchShiftData,
        fetchLocationData,
        fetchPatrollingData,
        fetchGuardData,
        fetchBriefingData,
        fetchIncidentData,
        setFilteredShifts,
        reportFields,
        locations,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => useContext(FetchContext);
