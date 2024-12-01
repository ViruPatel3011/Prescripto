import { createContext } from "react";
import { AppContextType, doctors } from "../assets/assets";

const defaultValue: AppContextType = {
  doctors: [], // Default to an empty array if no doctors are available.
  currencySymbol: "",
};

export const AppContext = createContext<AppContextType>(defaultValue);

const AppContextProvider = (props: any) => {
  const currencySymbol = "$";
  const value = {
    doctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
