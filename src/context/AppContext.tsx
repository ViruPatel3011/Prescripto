import { createContext, useEffect, useState } from "react";
import { AppContextType, User } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const defaultValue: AppContextType = {
  doctors: [],
  getDoctorsData: async () => {},
  currencySymbol: "",
  token: null,
  setToken: () => {},
  backendUrl: "",
  userData: null,
  setUserData: () => {},
  loadUserProfileData: async () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);

const AppContextProvider = (props: any) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const [userData, setUserData] = useState<User | null>(null);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error("Error fetching doctors");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching doctors");
    }
  };

  const loadUserProfileData = async () => {
    const response = await axios.get(backendUrl + "/api/user/get-profile", {
      headers: {
        token,
      },
    });

    const { userData, success } = response.data;


    if (success) {
      setUserData(userData);
    } else {
      toast.error("Error while fetching user details ");
    }

    try {
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    setToken,
    token,
    backendUrl,
    setUserData,
    userData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
