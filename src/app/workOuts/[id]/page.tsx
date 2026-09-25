import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { IWorkout } from '../../../type/workout';
import AddButton from '../../../components/itemsdetails/AddButton';
import SaveButton from '../../../components/itemsdetails/SaveButton';

interface IitemProps {
  params: Promise<{
    id: string;
  }>;
}

const GetSingleWorkout = async (id: string): Promise<IWorkout | null> => {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching single workout:", error);
    return null;
  }
};

const ItemPageDetails = async ({ params }: IitemProps) => {
  const { id } = await params;

  const SingleData = await GetSingleWorkout(id);

  if (!SingleData) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-[#121418] border border-gray-800 rounded-2xl p-6 shadow-2xl text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-5 relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
            <Image
              src={SingleData.image}
              alt={SingleData.name || 'Workout image'}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-white mb-2">
                {SingleData.name}
              </h1>

              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {SingleData.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {SingleData.muscleGroups?.map((group, index) => (
                  <span
                    key={index}
                    className="text-black text-[14px] bg-lime-400 font-bold px-4 py-1.5 rounded-full border border-lime-400/30"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t border-b border-gray-800 py-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider">Equipment</span>
                  <span className="font-medium text-gray-200">{SingleData.equipment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider">Difficulty</span>
                  <span className="font-medium text-gray-200">{SingleData.difficulty}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider">Sets</span>
                  <span className="font-medium text-gray-200">{SingleData.sets}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider">Reps</span>
                  <span className="font-medium text-gray-200">{SingleData.reps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider">Duration</span>
                  <span className="font-medium text-gray-200">{SingleData.duration} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider">Calories</span>
                  <span className="font-medium text-gray-200">{SingleData.caloriesBurned} kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider">Rating</span>
                  <span className="font-medium text-gray-200">{SingleData.rating}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3">Instructions</h3>
                <ol className="list-decimal list-inside text-xs text-gray-300 space-y-2 leading-relaxed">
                  {SingleData.instructions?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Context API er addToPlan ebong addToSave er sathe connect korar jonno item prop pass kora hoyeche */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <AddButton item={SingleData} />
              <SaveButton item={SingleData} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPageDetails;