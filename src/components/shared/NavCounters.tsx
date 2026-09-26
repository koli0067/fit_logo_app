'use client';

import React from 'react';
import { useFitLogContext } from '../../context/ContextItems';
import Link from 'next/link';


const NavCounters = () => {
  const { addButton, saveButton } = useFitLogContext();

  const planCount = addButton?.length || 0;
  const savedCount = saveButton?.length || 0;

  return (
    <div className="navbar-end gap-3">
     
    
        <Link
        href="/my-plan"
        className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-white hover:bg-gray-800 transition cursor-pointer select-none bg-gray-900/50">
        <span>Plan</span>
        <span className="flex h-5 w-5 items-center justify-center bg-[#ccff00] rounded-full text-xs font-extrabold text-black">
          {planCount}
        </span>
      </Link>

     
      <Link
        href="/my-plan"
        className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-white hover:bg-gray-800 transition cursor-pointer select-none bg-gray-900/50"
      >
        <span>Saved</span>
        <span className="flex h-5 w-5 items-center justify-center border-gray-500 bg-gray-700 border rounded-full text-xs font-extrabold">
          {savedCount}
        </span>
      </Link>
    </div>
  );
};

export default NavCounters;