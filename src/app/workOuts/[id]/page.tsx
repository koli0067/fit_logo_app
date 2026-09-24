import React from 'react';
import Image from 'next/image';
import { IWorkout } from '../../../type/workout';

interface IitemProps {
  params: Promise<{
    id: string;
  }>;
}

const GetLibraryData = async (): Promise<IWorkout[]> => {
  const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
  const data = await res.json();
  return data;
};

const ItemPageDetails = async ({ params }: IitemProps) => {
  const { id } = await params;

  const DataItem = await GetLibraryData();

  
  const SingleData = DataItem.find(
    (item: IWorkout) => String(item.id) === String(id)
  );


  if (!SingleData) {
    return (
      <div className="container mx-auto my-10 text-center text-white">
        <h2 className="text-xl font-bold">Item not found!</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-[#121418] border border-gray-800 rounded-2xl p-6 shadow-2xl text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          
          <div className="lg:col-span-5 relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
            <Image
              src={SingleData.image}
              alt={SingleData.name}
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
                {SingleData.muscleGroups.map((group, index) => (
                  <span
                    key={index}
                    className="text-black text-[14px] bg-lime-400 text-xs font-bold px-4 py-1.5 rounded-full border border-lime-400/30"
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
                  {SingleData.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="flex-1 bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2.5 rounded-lg transition duration-200 text-sm flex items-center justify-center gap-2">
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
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <line x1="12" y1="13" x2="12" y2="19"></line>
          <line x1="9" y1="16" x2="15" y2="16"></line>
                 </svg>
           
                <span>Add to today's plan</span>
              </button>
              <button className="flex-1 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 font-semibold py-2.5 rounded-lg transition duration-200 text-sm flex items-center justify-center gap-2">
                
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
                <span> Save for later</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPageDetails;