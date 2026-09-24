import React from 'react';
import Image from 'next/image';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className='bg-[#15171d] px-4 border-t border-gray-800/40'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 py-8 md:py-10 text-center md:text-left'>
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Image src={logo} alt="FitLog Logo" className="w-auto h-7 md:h-8" />
          <span>FITLOG</span>
        </div>

        {/* Copyright Section */}
        <div>
          <p className='text-gray-400 text-sm md:text-base'>
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;