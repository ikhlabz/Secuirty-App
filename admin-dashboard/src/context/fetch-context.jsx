import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./user-context";

const INITIAL_STATES = {
  //isLoading: null,
  supervisor: null,
  locations: [],
  guards: null,
  shifts: [],
  briefingBox: [],
  incidents: [],
};

export const DataContext = createContext(INITIAL_STATES);

export const DataContextProvider = ({ children }) => {
  const [dataState, setDataState] = useState(INITIAL_STATES);
  const [guards, setGuards] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [locations, setLocations] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [patrollings, setPatrollings] = useState([]);
  const [loading, setLoading] = useState(null);
  const { user } = useAuthContext();

  const fetchGuardsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://147.182.235.79:5000/api/v1/users/admin/users",
        {
          headers: {
            //prettier-ignore
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            //prettier-ignore
          },
        }
      );
      setGuards(data.data.guards);
      setDataState({ ...dataState, guards: data.data.guards });
    } catch (error) {
      console.error("Error fetching guards data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchBriefData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://147.182.235.79:5000/api/v1/briefing/get-brief",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setDataState({ ...data, briefingBox: data.data });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching guards data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIncidentData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://147.182.235.79:5000/api/v1/misc/get-incident",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setDataState({ ...data, incidents: data.data });
      }
    } catch (error) {
      console.error("Error fetching guards data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSupervisorData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://147.182.235.79:5000/api/v1/users/admin/supervisor",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSupervisor(data.data.supervisors);
      setDataState({ ...data, supervisor: data.data.supervisors });
    } catch (error) {
      console.error("Error fetching guards data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchLocationData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://147.182.235.79:5000/api/v1/locations",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setLocations(data.data);
      }
    } catch (error) {
      console.error("Error fetching Location data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchShiftData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://147.182.235.79:5000/api/v1/shifts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setShifts(data.data);
      }
    } catch (error) {
      console.error("Error fetching Location data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchPatrollingData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://147.182.235.79:5000/api/v1/patrolling/get-patrolling",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setPatrollings(data.data);
      }
    } catch (error) {
      console.error("Error fetching Location data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && fetchGuardsData();
  }, [user]);
  useEffect(() => {
    user && fetchSupervisorData();
  }, [user]);
  useEffect(() => {
    user && fetchLocationData();
  }, [user]);
  useEffect(() => {
    user && fetchShiftData();
  }, [user]);
  useEffect(() => {
    user && fetchPatrollingData();
  }, [user]);
  useEffect(() => {
    fetchBriefData();
  }, []);

  useEffect(() => {
    user && fetchIncidentData();
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        ...dataState,
        loading,
        guards,
        locations,
        shifts,
        patrollings,
        supervisor,
        fetchLocationData,
        fetchGuardsData,
        fetchSupervisorData,
        fetchShiftData,
        fetchPatrollingData,
        fetchBriefData,
        fetchIncidentData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
