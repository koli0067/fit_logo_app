'use client';

import React from 'react';
import { IWorkout } from '../../type/workout';
import { useFitLogContext } from '../../context/ContextItems';

const SaveButton = ({ item }: { item: IWorkout }) => {
  const { saveButton, setSaveButton } = useFitLogContext();

  const isSaved = saveButton.some((i: any) => String(i.id) === String(item.id));

  const handleSaveButton = () => {
    if (!isSaved) {
      setSaveButton((prev: any[]) => [...prev, item]);
    }
  };

  return (
    <button
      onClick={handleSaveButton}
      className={`flex-1 border font-semibold py-2.5 rounded-lg transition duration-200 text-sm flex items-center justify-center gap-2 ${
        isSaved
          ? 'border-gray-600 bg-gray-800 text-lime-400'
          : 'border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300'
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>{isSaved ? 'Saved' : 'Save for later'}</span>
    </button>
  );
};

export default SaveButton;