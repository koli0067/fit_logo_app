import React from 'react'
import Image from 'next/image'
import bannerImage from '../../assets/banner.png'

const Banner = () => {
  return (
    <div className='container mx-auto px-4 my-8 sm:my-12'>
      <div className='bg-[#15171e] rounded-2xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10'>
        
        
        <div className='w-full lg:w-3/5 text-left'>
          
          <h3 className='text-[#a3e635] font-bold text-xs sm:text-sm tracking-wider uppercase'>
            WORKOUT LIBRARY
          </h3>

         
          <h1 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-4 leading-tight sm:leading-none tracking-tight'>
            TRAIN WITH INTENT. LOG <br className='hidden sm:inline' /> EVERY SET.
          </h1>

          
          <p className='text-gray-400 text-sm sm:text-base font-normal my-6 max-w-xl leading-relaxed'>
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          
          <button className='bg-[#a3e635] text-black font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-[#8ece25] transition-colors cursor-pointer'>
            BROWSE WORKOUTS
          </button>
        </div>

      
        <div className='w-full lg:w-2/5 flex justify-center lg:justify-end'>
          <Image 
            src={bannerImage} 
            alt="Gym Machine Workout"
            className="w-full max-w-[380px] lg:max-w-[420px] h-auto object-contain"
            priority
          />
        </div>

      </div>
    </div>
  )
}

export default Banner;