'use client';


import React, { createContext, useContext, useState, ReactNode } from 'react';


export const ContextItems = createContext<any>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [addButton, setAddButton] = useState<any[]>([]);
  const [saveButton, setSaveButton] = useState<any[]>([]);

  const sharedData = {
    addButton,
    setAddButton,
    saveButton,
    setSaveButton,
  };

  return (
    <ContextItems.Provider value={sharedData}>
      {children}
    </ContextItems.Provider>
  );
};

export default ContextProvider;

export const useFitLogContext = () => {
  const context = useContext(ContextItems);
  if (!context) {
    throw new Error('useFitLogContext must be used within a ContextProvider');
  }
  return context;
};