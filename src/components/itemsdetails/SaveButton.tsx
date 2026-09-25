'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IWorkout } from '../../type/workout';
import { useFitLogContext } from '../../context/ContextItems';
import { toast } from 'react-toastify';

const SaveButton = ({ item }: { item: IWorkout }) => {
  const { saveButton, setSaveButton } = useFitLogContext();
  const router = useRouter();

  const isSaved = saveButton.some((i: any) => String(i.id) === String(item.id));

  const handleSaveButton = () => {
    if (isSaved) {
      // ইতোমধ্যে সেভ করা থাকলে অ্যালার্ট দেখাবে
      toast.error('This workout is already saved!');
      return;
    }

    // প্রথমবার ক্লিক করলে সেভ করবে এবং My Plan পেজে নিয়ে যাবে
    setSaveButton((prev: any[]) => [...prev, item]);
    toast.success("Saved for later");
  };

  return (
    <button
      onClick={handleSaveButton}
      className={`flex-1 border font-semibold py-2.5 rounded-lg transition duration-200 text-sm flex items-center justify-center gap-2 ${
        isSaved
          ? 'border-gray-600 bg-gray-800 text-lime-400 cursor-not-allowed'
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