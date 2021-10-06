import { createContext, useState } from "react";

export const appContext = createContext();

const AppContextProvider = ({ children }) => {
  const [context, setContext] = useState();

  return (
    <appContext.Provider value={{ context, setContext }}>
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
