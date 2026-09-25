'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useFitLogContext } from '../../context/ContextItems';
import { IWorkout } from '../../type/workout';
import { LuClock, LuFlame, LuStar } from 'react-icons/lu';

const MyPlanClient = () => {
  const { addButton, setAddButton, saveButton, setSaveButton } = useFitLogContext();
  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<'duration' | 'calories'>('duration');

  const currentList = activeTab === 'today' ? addButton : saveButton;

  // সর্টিং logic
  const sortedList = [...currentList].sort((a: IWorkout, b: IWorkout) => {
    if (sortBy === 'duration') return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
  });

  // মোট মিনিট এবং ক্যালোরির হিসাব
  const totalMinutes = currentList.reduce((acc: number, item: IWorkout) => acc + (Number(item.duration) || 0), 0);
  const totalCalories = currentList.reduce((acc: number, item: IWorkout) => acc + (Number(item.caloriesBurned) || 0), 0);

  // আইটেম রিমুভ করার ফাংশন
  const handleRemove = (id: string | number) => {
    if (activeTab === 'today') {
      setAddButton((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } else {
      setSaveButton((prev) => prev.filter((item) => String(item.id) !== String(id)));
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1015] text-white py-8 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-wider mb-1">MY PLAN</h1>
        <p className="text-gray-400 text-xs mb-8">Cap of five lifts for today. Finish them, then load more.</p>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-3 gap-6 bg-[#14171f] border border-gray-800/80 p-6 rounded-2xl mb-8">
          <div>
            <span className="text-xs text-gray-400 font-semibold">Exercises</span>
            <p className="text-4xl font-extrabold text-lime-400 mt-1">{currentList.length}</p>
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold">Minutes</span>
            <p className="text-4xl font-extrabold text-white mt-1">{totalMinutes}</p>
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold">Calories</span>
            <p className="text-4xl font-extrabold text-white mt-1">{totalCalories}</p>
          </div>
        </div>

        {/* Tabs and Sort By */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-[#14171f] p-1 rounded-xl border border-gray-800/80 flex gap-1">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'today' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'saved' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'duration' | 'calories')}
              className="bg-[#14171f] border border-gray-800 text-white rounded-lg px-3 py-1.5 focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
            </select>
          </div>
        </div>

        {/* Items List */}
        {sortedList.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-xs bg-[#14171f] border border-gray-800/50 rounded-2xl">
            No items in your plan yet.
          </div>
        ) : (
          <div className="space-y-4">
            {sortedList.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-[#14171f] border border-gray-800/80 p-4 rounded-2xl hover:border-gray-700 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-gray-800">
                    {item.image && (
                      <Image src={item.image} alt={item.name || 'workout'} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold uppercase text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-400 mb-1">{item.equipment}</p>
                    <div className="flex gap-3 text-xs text-gray-400">

                      <span className="flex items-center gap-1">
                        <LuClock className="w-3.5 h-3.5 text-lime-400" />
                        {item.duration} min
                      </span>
  
                      <span className="flex items-center gap-1">
                        <LuFlame className="w-3.5 h-3.5 text-orange-500" />
                        {item.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <LuStar className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/workouts/${item.id}`}
                    className="text-xs bg-gray-800/80 hover:bg-gray-700 text-gray-200 border border-gray-700/50 px-4 py-2 rounded-xl transition"
                  >
                    View Details
                  </Link>

                  {activeTab === 'today' && (
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-xs bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl hover:bg-lime-500 transition"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-500 hover:text-white p-1 transition"
                    aria-label="Remove item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlanClient;