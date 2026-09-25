import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <span className="loading loading-spinner text-info"></span>
    </div>
  );
}