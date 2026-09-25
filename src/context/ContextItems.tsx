'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IWorkout } from '../type/workout';

interface ContextType {
  addButton: IWorkout[];
  setAddButton: React.Dispatch<React.SetStateAction<IWorkout[]>>;
  saveButton: IWorkout[];
  setSaveButton: React.Dispatch<React.SetStateAction<IWorkout[]>>;
}

export const ContextItems = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  // মেমোরি স্টেট (Localstorage তুলে দেওয়া হয়েছে, তাই রিফ্রেশ দিলেই ডাটা মুছে যাবে)
  const [addButton, setAddButton] = useState<IWorkout[]>([]);
  const [saveButton, setSaveButton] = useState<IWorkout[]>([]);

  return (
    <ContextItems.Provider value={{ addButton, setAddButton, saveButton, setSaveButton }}>
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