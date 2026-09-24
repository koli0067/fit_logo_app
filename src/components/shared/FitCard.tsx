import { IWorkout } from '../../type/workout'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface IworkProps {
  item: IWorkout
}

const FitCard = ({ item }: IworkProps) => {
  const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    difficulty,
    duration,
    caloriesBurned,
    sets,
    reps,
    rating,
    description,
    instructions
  } = item

  return (
    <Link href={`/workouts/${id}`} className="block h-full cursor-pointer">
    
    <div className="bg-[#15171d] border border-gray-800/60 rounded-2xl overflow-hidden hover:border-gray-700 transition-all flex flex-col justify-between h-full shadow-lg">
      <div>
        {/* Top Image Section */}
        <div className="relative w-full h-52 sm:h-56 overflow-hidden">
          <Image
            src={image}
            alt={name || 'Workout image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

      
        <div className="p-5">
          
          <div className="flex flex-wrap gap-2 mb-3">
            {muscleGroups?.map((group, index) => (
              <span
                key={index}
                className="bg-[#c2f800] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {group}
              </span>
            ))}
          </div>

          
          <h3 className="text-white font-black text-xl tracking-tight uppercase mb-1">
            {name}
          </h3>

          
          <p className="text-gray-400 text-sm font-medium mb-6">
            {equipment}
          </p>
        </div>
      </div>

      
      <div className="px-5 pb-5 pt-3 border-t border-gray-800/60 flex items-center gap-4 text-gray-400 text-xs sm:text-sm font-medium">
        
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{duration} min</span>
        </div>

        
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
          <span>{caloriesBurned} kcal</span>
        </div>

       
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span>{rating}</span>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default FitCard;