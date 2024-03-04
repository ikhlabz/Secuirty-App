import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./user-context";
import { useDataContext } from "./fetch-context";
import { toast } from "react-toastify";

const INITIAL_STATES = {
  isLoading: null,
  response: null,
  errorResponse: null,
  isError: null,
};

export const PostContext = createContext(INITIAL_STATES);

const token = localStorage.getItem("token");

export const PostContextProvider = ({ children }) => {
  const [sendData, setSendData] = useState(INITIAL_STATES);
  const { user } = useAuthContext();
  const {
    fetchGuardsData,
    fetchLocationData,
    fetchSupervisorData,
    fetchShiftData,
    fetchPatrollingData,
  } = useDataContext();

  const PostGuardData = async (formData) => {
    try {
      // console.log("",formData)
      const { data } = await axios.post(
        "http://147.182.235.79:5000/api/v1/users/register/guard",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Sending Data", data);
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.data.message,
        });
        toast.success(data.data.message);
        fetchGuardsData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error(data.data.message);
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const UpdateGuardData = async (formData) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.put(
        `http://147.182.235.79:5000/api/v1/users/admin/guard/${formData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Sending Data", data);
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success("Guard Updated");
        fetchGuardsData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error("Oops! Something Went Wrong");
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const DeleteGuardData = async (id) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.delete(
        `http://147.182.235.79:5000/api/v1/users/admin/guard/${id}`,
        {
          headers: {
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.data.message,
        });
        toast.success(data.data.message);
        fetchGuardsData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error(data.data.message);
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const PostSupervisorData = async (formData) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.post(
        "http://147.182.235.79:5000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.data.message,
        });
        toast.success(data.data.message);
        fetchSupervisorData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error(data.data.message);
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const UpdateSupervisorData = async (formData) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.put(
        `http://147.182.235.79:5000/api/v1/users/admin/${formData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Sending Data", data);
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success("Supervisor Updated");
        fetchSupervisorData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error("Oops! Something Went Wrong");
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const DeleteSupervisorData = async (id) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.delete(
        `http://147.182.235.79:5000/api/v1/users/admin/${id}`,
        {
          headers: {
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.data.message,
        });
        toast.success(data.data.message);
        fetchSupervisorData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error(data.data.message);
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const PostLocations = async (formData) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.post(
        "http://147.182.235.79:5000/api/v1/locations",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success("Location Added");
        fetchLocationData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error("Oops! Something Went Wrong");
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const UpdateLocations = async (formData) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.put(
        `http://147.182.235.79:5000/api/v1/locations/${formData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success("Location Updated");
        fetchLocationData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error("Oops! Something Went Wrong");
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const DeleteLocations = async (id) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.delete(
        `http://147.182.235.79:5000/api/v1/locations/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success(data.message);
        fetchLocationData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error(data.message);
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const PostShiftData = async (formData) => {
    setSendData({ ...sendData, isLoading: true });
    formData = { ...formData, createdBy: user._id };
    try {
      const { data } = await axios.post(
        "http://147.182.235.79:5000/api/v1/shifts",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Sending Data", data);
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success("Shift Added Successfully");
        fetchShiftData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error("Oops! Something Went Wrong");
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const UpdateShiftData = async (formData) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.put(
        `http://147.182.235.79:5000/api/v1/shifts/${formData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Sending Data", data);
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success("Shift Updated Successfully");
        fetchShiftData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error("Oops! Something Went Wrong");
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const DeleteShiftData = async (id) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.delete(
        `http://147.182.235.79:5000/api/v1/shifts/${id}`,
        {
          headers: {
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Sending Data", data);
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success(data.message);
        fetchShiftData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error(data.message);
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const PostPatrollingData = async (formData, checkpoint) => {
    setSendData({ ...sendData, isLoading: true });
    formData = {
      ...formData,
      patrollingCheckpoints: checkpoint,
      createdBy: user._id,
    };
    try {
      const { data } = await axios.post(
        "http://147.182.235.79:5000/api/v1/patrolling/create-patrolling",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.data,
        });
        toast.success(data.data);
        fetchPatrollingData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error(data.data);
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const UpdatePatrollingData = async (formData, checkpoints) => {
    setSendData({ ...sendData, isLoading: true });
    let checkpointData = checkpoints.length
      ? {
          ...formData,
          patrollingCheckpoints:
            formData.patrollingCheckpoints.concat(checkpoints),
        }
      : formData;

    let dataToSend = {
      ...checkpointData,
      patrollingCheckpoints: checkpointData.patrollingCheckpoints.map((ele) => {
        return { checkpointName: ele.checkpointName };
      }),
    };
    try {
      const { data } = await axios.put(
        `http://147.182.235.79:5000/api/v1/patrolling/update-patrolling/${formData._id}`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success("Patrolling Updated Successfully");
        fetchPatrollingData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error("Oops! Something Went Wrong");
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const DeletePatrollingData = async (id) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.delete(
        `http://147.182.235.79:5000/api/v1/patrolling/delete-patrolling/${id}`,
        {
          headers: {
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success("Patrolling Deleted Successfully");
        fetchPatrollingData();
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error("Oops! Something Went Wrong");
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const PostIncidentField = async (formData) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.post(
        "http://147.182.235.79:5000/api/v1/misc/post-reportfields",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success("Field Added Successfully");
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error("Oops! Something Went Wrong");
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };
  const PostBroadcastMessage = async (formData) => {
    setSendData({ ...sendData, isLoading: true });
    try {
      const { data } = await axios.post(
        "http://147.182.235.79:5000/api/v1/misc/broadcast",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            //prettier-ignore
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSendData({
          ...sendData,
          response: data.message,
        });
        toast.success(data.message);
      } else {
        setSendData({ ...sendData, isError: true });
        toast.error(data.message);
      }
    } catch (error) {
      setSendData({ ...sendData, isError: true });
      toast.error("Oops! Something Went Wrong");
      console.log(error);
    } finally {
      setSendData({
        ...sendData,
        isLoading: false,
      });
    }
  };

  return (
    <PostContext.Provider
      value={{
        ...sendData,
        PostGuardData,
        PostSupervisorData,
        PostLocations,
        PostShiftData,
        PostPatrollingData,
        PostIncidentField,
        PostBroadcastMessage,
        UpdateSupervisorData,
        UpdateGuardData,
        DeleteSupervisorData,
        DeleteGuardData,
        UpdateShiftData,
        DeleteShiftData,
        UpdateLocations,
        DeleteLocations,
        UpdatePatrollingData,
        DeletePatrollingData,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
