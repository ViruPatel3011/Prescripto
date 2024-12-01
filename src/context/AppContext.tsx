import { createContext } from "react";
import { AppContextType, doctors } from "../assets/assets";

const defaultValue: AppContextType = {
  doctors: [], // Default to an empty array if no doctors are available.
};

export const AppContext = createContext<AppContextType>(defaultValue);

const AppContextProvider = (props: any) => {
  const value = {
    doctors,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
