import React from 'react';
import Navbar from '../src/components/navbar.js';

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);


export default function VeggieHome() {
  return (
    <div className="relative bg-[#F0F5F0] font-sans flex py-20 pl-20">
      <div className="absolute top-0 left-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-green-300/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-green-300/50 rounded-full translate-x-1/2 translate-y-1/2"></div>
      <main className="relative z-10 mt-28 text-left max-w-lg">
        <div>
          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-green-900 leading-tight">
            Veggie Vision
          </h1>
          <p className="mt-6 text-gray-600">
            Keep it easy with these simple but delicious recipes from make-ahead lunches and midweek meals to fuss-free sides.
          </p>
          <div className="mt-10 flex items-center justify-start gap-6">
            <button className="bg-green-600 text-white font-bold py-3 px-20 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105">
              Upload Now!
            </button>
          </div>
        </div>
      </main>

    </div>
  );
}