
import { IWorkout } from '../../type/workout'
import React from 'react'
import FitCard from '../shared/FitCard';


const GetLibraryData = async () => {

    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    const data = await res.json();
    return data;

}

const LibraryImg = async() => {

  const data = await GetLibraryData();
    
  return (
    <div className='container mx-auto'>
        <div>
            <h2 className='text-white font-bold text-4xl my-4'>THE LIBRARY</h2>
            <p className='text-[18px] text-white '>Twelve lifts covering every major muscle group.</p>
        </div>

            
            {data.length > 0 ? (
        <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 my-14'>
          {data.map((item: IWorkout) => (
            <FitCard key={item.id} item={item} />
          ))}
        </div>
            ) : (
                <div className='text-center py-12 text-gray-400'>
                No workouts found.
                </div>
            )}
            </div>
   
  ) 
  
}

export default LibraryImg