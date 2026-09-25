import React from 'react'

const MyPage = () => {
  return (
    <div className='container mx-auto my-10'>
      <div>
        <h2 className='text-4xl font-bold text-white'>MY PLAN</h2>
        <p className='text-[19px] text-gray-400 py-4'>Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className='bg-[#13161d] rounded-2xl py-8'>
        <div className='flex justify-between px-8'>
          <div>
            <h2 className='text-white text-2xl font-semibold'>Exercises</h2>
            <p>  </p>
          </div>
          <div>
            <h2 className='text-white text-2xl font-semibold'>Minutes</h2>
            <p className='py-5'> </p>
          </div>
          <div>
            <h2 className='text-white text-2xl font-semibold'>Calories</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage