// components/VegetableDetail.js

import React from "react";
import Image from "next/image";
import { getVegetableData } from "@/src/components/veggieData.js";

const DetailSection = ({ title, items = [] }) => (
  <div className="mb-6">
    <h3 className="text-xl text-green-800 font-semibold border-b-2 pb-1 mb-2">
      {title}
    </h3>
    <ul className="list-disc list-inside space-y-1 text-gray-700">
      {Array.isArray(items) &&
        items.map((item, index) => (
          <li key={index} className="text-sm sm:text-base">
            {item}
          </li>
        ))}
    </ul>
  </div>
);

/**
 * VegetableDetail Component: แสดงผลลัพธ์จาก AI
 * @param {string} vegetableName - ชื่อผักที่ได้รับจาก AI (เช่น 'Basil', 'Holy Basil')
 * @param {string} uploadedImageUrl - URL ของรูปภาพที่ผู้ใช้อัปโหลด
 */
export default function VegetableDetail({ vegetableName, uploadedImageUrl }) {
  const data = getVegetableData(vegetableName);

  const ErrorIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10 text-red-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  if (!data) {
    return (
      <div className="text-center p-10 text-gray-500">
        <div className="flex justify-center mb-4">
          <ErrorIcon />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">ไม่พบผักในรูปภาพ</h2>
        <p className="mt-2 text-lg">กรุณาลองอัปโหลดรูปภาพอื่น</p>
      </div>
    );
  }

  const displayImageSrc = uploadedImageUrl || data.imageSrc;
  const displayImageAlt = uploadedImageUrl
    ? `Uploaded image of ${data.name}`
    : data.name;
  const displayObjectFit = uploadedImageUrl ? "cover" : "contain";
  const imagePadding = uploadedImageUrl ? "" : "p-4";

  return (
    <div className="bg-white w-full p-6 sm:p-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 1. ส่วนรูปภาพ (ซ้าย) */}
        <div className="flex-shrink-0 lg:w-1/3 flex flex-col items-center">
          <div className={`relative w-full max-w-xs aspect-square overflow-hidden rounded-xl shadow-2xl border-4 bg-white border-green-700`}>
            <Image
              src={displayImageSrc}
              alt={displayImageAlt}
              layout="fill"
              objectFit={displayObjectFit}
              className={imagePadding}
              priority
            />
          </div>
        </div>

        {/* 2. ส่วนรายละเอียด (ขวา) */}
        <div className="lg:w-2/3">
          {/* ชื่อหลัก */}
          <h2 className="text-4xl font-extrabold text-green-800 mb-2">
            {data.name}
          </h2>
          <p className="text-lg font-medium text-gray-500 mb-2">
            ชื่อภาษาอังกฤษ: <strong>{data.englishName}</strong>
          </p>
          <p className="text-lg font-medium text-gray-500 mb-4">
            ชื่อวิทยาศาสตร์: <strong>{data.scientificName}</strong>
          </p>

          {/* ลักษณะของผัก */}
          <div className="mb-6 p-4 bg-gray-50 border-l-4 border-green-700 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              ลักษณะของผัก
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">{data.description}</p>
          </div>

          {/* ชื่อภาษาท้องถิ่น */}
          <DetailSection title="ชื่อภาษาท้องถิ่น" items={[data.localNames]} />

          {/* Grid สำหรับการเก็บเกี่ยวและการเก็บรักษา */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            <DetailSection title="วิธีเก็บเกี่ยว/วิธีเด็ด" items={data.pickingMethod} />
            <DetailSection title="วิธีเก็บรักษา" items={data.storageMethod} />
          </div>

          {/* Grid สำหรับสรรพคุณและเมนูอาหาร */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 mt-4">
            {data.properties && <DetailSection title="สรรพคุณทางยา" items={data.properties} />}
            {data.dishes && <DetailSection title="เมนูอาหารแนะนำ" items={data.dishes} />}
          </div>
        </div>
      </div>
    </div>
  );
}
