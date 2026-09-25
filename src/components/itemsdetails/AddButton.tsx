'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IWorkout } from '../../type/workout';
import { useFitLogContext } from '../../context/ContextItems';
import { toast } from 'react-toastify';

const AddButton = ({ item }: { item: IWorkout }) => {
  const { addButton, setAddButton } = useFitLogContext();
  const router = useRouter();

  const isAdded = addButton.some((i: any) => String(i.id) === String(item.id));

  const handleAddButton = () => {
    if (isAdded) {
      // ইতোমধ্যে অ্যাড করা থাকলে অ্যালার্ট দেখাবে
     toast.error('This workout is already added to your plan!');
      return;
    }

    // প্রথমবার ক্লিক করলে লিস্টে অ্যাড করবে এবং My Plan পেজে নিয়ে যাবে
    setAddButton((prev: any[]) => [...prev, item]);
    router.push('/my-plan');
  };

  return (
    <button
      onClick={handleAddButton}
      className={`flex-1 font-semibold py-2.5 rounded-lg transition duration-200 text-sm flex items-center justify-center gap-2 ${
        isAdded
          ? 'bg-lime-500/20 text-lime-400 border border-lime-400/30 cursor-not-allowed'
          : 'bg-lime-400 hover:bg-lime-500 text-black'
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <line x1="12" y1="13" x2="12" y2="19"></line>
        <line x1="9" y1="16" x2="15" y2="16"></line>
      </svg>
      <span>{isAdded ? 'Added to Plan' : "Add to today's plan"}</span>
    </button>
  );
};

export default AddButton;