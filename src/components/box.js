import React from 'react';

export default function Box() {
  return (
    // นี่คือคลาสหลักที่สร้าง "กล่อง" ขึ้นมา
    <div className="bg-white flex rounded-xl border border-gray-200 shadow-md p-6">
      <h1>Type</h1>
    </div>
  );
}