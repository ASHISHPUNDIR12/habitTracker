import React, { createContext, useContext, useState } from "react";

// Create the context
const HabitsContext = createContext();

// Provider component
export const HabitsProvider = ({ children }) => {
  const [habit, setHabit] = useState([]);

  return (
    <HabitsContext.Provider value={{ habit, setHabit }}>
      {children}
    </HabitsContext.Provider>
  );
};

// Custom hook to use the habits context
export const useHabit = () => {
  return useContext(HabitsContext);
};
