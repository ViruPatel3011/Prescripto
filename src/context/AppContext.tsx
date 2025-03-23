import { createContext, useEffect, useState } from "react";
import { AppContextType } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const defaultValue: AppContextType = {
  doctors: [], // Default to an empty array if no doctors are available.
  currencySymbol: "",
};

export const AppContext = createContext<AppContextType>(defaultValue);

const AppContextProvider = (props: any) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);

  const value = {
    doctors,
    currencySymbol,
  };

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

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
