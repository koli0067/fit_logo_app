'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IWorkout } from '../type/workout';

interface ContextType {
  addButton: IWorkout[];
  setAddButton: React.Dispatch<React.SetStateAction<IWorkout[]>>;
  saveButton: IWorkout[];
  setSaveButton: React.Dispatch<React.SetStateAction<IWorkout[]>>;
}

export const ContextItems = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [addButton, setAddButton] = useState<IWorkout[]>([]);
  const [saveButton, setSaveButton] = useState<IWorkout[]>([]);

  // LocalStorage থেকে ডাটা লোড করা
  useEffect(() => {
    const savedAdd = localStorage.getItem('fitlog_add');
    const savedSave = localStorage.getItem('fitlog_save');
    if (savedAdd) setAddButton(JSON.parse(savedAdd));
    if (savedSave) setSaveButton(JSON.parse(savedSave));
  }, []);

  // স্টেট পরিবর্তন হলে LocalStorage-এ সেভ করা
  useEffect(() => {
    localStorage.setItem('fitlog_add', JSON.stringify(addButton));
  }, [addButton]);

  useEffect(() => {
    localStorage.setItem('fitlog_save', JSON.stringify(saveButton));
  }, [saveButton]);

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