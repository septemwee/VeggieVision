// components/VeggyShop.jsx
import React from 'react';
import Image from 'next/image';

// --- ไอคอนแบบง่ายๆ สำหรับใช้ในโปรเจกต์ ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);


// --- Component หลักของหน้าเว็บ ---
export default function VeggyShop() {
  return (
    <div className="relative min-h-screen bg-[#F0F5F0] font-sans overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-green-100/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-green-100/50 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        
        {/* Header / Navigation */}
        <header className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">
            VEGGY shop.
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-green-700 font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-green-700 font-medium">About us</a>
            <a href="#" className="text-gray-600 hover:text-green-700 font-medium">Menus</a>
            <a href="#" className="text-gray-600 hover:text-green-700 font-medium">Contact us</a>
          </nav>
          <div className="flex items-center gap-6">
            <SearchIcon />
            <CartIcon />
          </div>
        </header>

        {/* Hero Section */}
        <main className="mt-20 md:mt-28 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="text-center md:text-left md:w-1/2">
            <p className="text-green-700 font-semibold tracking-wide">
              — Grocery Shop
            </p>
            {/* หมายเหตุ: แก้ไขคำว่า "grocey" ในรูปภาพเป็น "grocery" ที่ถูกต้อง */}
            <h1 className="mt-4 text-5xl md:text-7xl font-extrabold text-green-900 leading-tight">
              We provide<br/>Fresh grocery.
            </h1>
            <p className="mt-6 text-gray-600 max-w-md mx-auto md:mx-0">
              Keep it easy with these simple but delicious recipes from make-ahead lunches and midweek meals to fuss-free sides.
            </p>
            <div className="mt-10 flex items-center justify-center md:justify-start gap-6">
              <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105">
                Get Started
              </button>
              <a href="#" className="flex items-center gap-2 text-gray-700 font-semibold hover:text-green-800">
                <PlayIcon />
                <span>Watch video</span>
              </a>
            </div>
          </div>
          
          {/* Right Content (Image) */}
          <div className="relative md:w-1/2 flex justify-center mt-10 md:mt-0">
            <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
              {/* ใช้รูปตะกร้าผักจาก placeholder หรือเปลี่ยน URL ตามต้องการ */}
              <Image 
                src="https://i.ibb.co/L5BfBzt/vegetable-basket.png" 
                alt="Basket of fresh vegetables" 
                width={500}
                height={500}
                className="object-contain"
              />
              <div className="absolute top-8 right-0 -mr-4 bg-green-600 text-white text-xs font-bold py-1.5 px-3 rounded-md shadow-md">
                FREE DELIVERY
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}