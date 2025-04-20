"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context
const DataContext = createContext(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [sharedData, setSharedData] = useState({ calendar: true });

  return (
    <DataContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </DataContext.Provider>
  );
};

// Export the context for use in child components
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};