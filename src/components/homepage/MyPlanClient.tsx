'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Check } from 'lucide-react';
import { useFitLogContext } from '../../context/ContextItems';
import { IWorkout } from '../../type/workout';
import { LuClock, LuFlame, LuStar } from 'react-icons/lu';
import { toast } from 'react-toastify';

const MyPlanClient = () => {
  const { addButton, setAddButton, saveButton, setSaveButton } = useFitLogContext();
  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  // Mark as Done ট্র্যাকিং এর জন্য স্টেট
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const currentList = activeTab === 'today' ? addButton : saveButton;

  // সর্টিং logic (সংশোধিত: Duration, Calories এবং Rating ৩টির জন্যই সঠিক সর্টিং)
  const sortedList = [...currentList].sort((a: IWorkout, b: IWorkout) => {
    if (sortBy === 'duration') {
      return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    }
    if (sortBy === 'calories') {
      return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
    }
    if (sortBy === 'rating') {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }
    return 0;
  });

  // মোট মিনিট এবং ক্যালোরির হিসাব
  const totalMinutes = currentList.reduce((acc: number, item: IWorkout) => acc + (Number(item.duration) || 0), 0);
  const totalCalories = currentList.reduce((acc: number, item: IWorkout) => acc + (Number(item.caloriesBurned) || 0), 0);

  // Mark as Done হ্যান্ডলার
  const handleMarkAsDone = (id: string | number) => {
    const stringId = String(id);
    if (completedIds.includes(stringId)) {
      setCompletedIds((prev) => prev.filter((itemId) => itemId !== stringId));
      toast.info("Marked as incomplete");
    } else {
      setCompletedIds((prev) => [...prev, stringId]);
      toast.success("Marked as done!");
    }
  };

  // আইটেম রিমুভ করার ফাংশন
  const handleRemove = (id: string | number) => {
    const stringId = String(id);
    if (activeTab === 'today') {
      setAddButton((prev) => prev.filter((item) => String(item.id) !== stringId));
    } else {
      setSaveButton((prev) => prev.filter((item) => String(item.id) !== stringId));
    }
    toast.error("Removed from plan!");
  };

  return (
    <div className="min-h-screen bg-[#0e1015] text-white py-8 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-wider mb-1">MY PLAN</h1>
        <p className="text-gray-400 text-[15px] mb-8">Cap of five lifts for today. Finish them, then load more.</p>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#14171f] border border-gray-800/80 p-6 rounded-2xl mb-8">
          <div>
            <span className="text-[18px] text-gray-400 font-semibold">Exercises</span>
            <p className="text-4xl font-extrabold text-lime-400 mt-1">{currentList.length}</p>
          </div>
          <div>
            <span className="text-[18px] text-gray-400 font-semibold">Minutes</span>
            <p className="text-4xl font-extrabold text-white mt-1">{totalMinutes}</p>
          </div>
          <div>
            <span className="text-[18px] text-gray-400 font-semibold">Calories</span>
            <p className="text-4xl font-extrabold text-white mt-1">{totalCalories}</p>
          </div>
        </div>

        {/* Tabs and Sort By */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="bg-[#14171f] p-1 rounded-xl border border-gray-800/80 flex gap-1">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-1.5 rounded-lg font-bold transition text-[16px] ${
                activeTab === 'today' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-1.5 rounded-lg font-bold transition text-[16px] ${
                activeTab === 'saved' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-[16px]">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'duration' | 'calories' | 'rating')}
              className="bg-[#14171f] border text-[16px] border-gray-800 text-white rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Items List */}
        {sortedList.length === 0 ? (
          <div className="text-center py-16 text-gray-500 bg-[#14171f] border border-gray-800/50 rounded-2xl">
            <h2 className="text-2xl font-semibold text-white">NOTHING HERE YET</h2>
            <p className="py-4 text-gray-400 text-[16px]">
              Browse the library and add a lift to get today moving.
            </p>
            <Link 
              href="/"
              className="inline-block text-black font-semibold text-[18px] bg-[#c2f10d] py-2.5 px-6 rounded-4xl hover:bg-lime-400 transition"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedList.map((item: IWorkout) => {
              const isCompleted = completedIds.includes(String(item.id));

              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#14171f] border p-4 rounded-2xl transition ${
                    isCompleted 
                      ? 'border-lime-500/50 bg-[#14171f]/60 opacity-80' 
                      : 'border-gray-800/80 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                      {item.image && (
                        <Image src={item.image} alt={item.name || 'workout'} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-bold uppercase text-[20px] md:text-[23px] ${isCompleted ? ' text-gray-400' : 'text-white'}`}>
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-[15px] mb-1">{item.equipment}</p>
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

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <Link
                      href={`/workouts/${item.id}`}
                      className="text-xs bg-gray-800/80 hover:bg-gray-700 text-gray-200 border border-gray-700/50 px-4 py-2 rounded-xl transition"
                    >
                      View Details
                    </Link>

                    {activeTab === 'today' && (
                      <button
                        onClick={() => handleMarkAsDone(item.id)}
                        className={`text-xs font-extrabold px-4 py-2 rounded-xl transition flex items-center gap-1 ${
                          isCompleted
                            ? 'bg-gray-700 text-lime-400 border border-lime-500/40'
                            : 'bg-lime-400 text-black hover:bg-lime-500'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        {isCompleted ? 'Done' : 'Mark as Done'}
                      </button>
                    )}

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-500 hover:text-red-400 p-1 transition"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlanClient;