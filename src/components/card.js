// components/Card.js

import Image from "next/image";
import { useState } from "react";

export default function Card({ imageVeg, title, vegetableData, onCardClick }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const backDescription =
    vegetableData?.description || "ไม่พบข้อมูลลักษณะของผัก";

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onCardClick) {
      onCardClick();
    }
  };

  return (
    <div
      className="relative w-full min-h-[400px] cursor-pointer [perspective:1000px] group"
      onClick={handleFlip}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-all  duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* 🔴 ด้านหน้าของการ์ด (Front Face) - Clean & Soft Gradient */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 shadow-lg shadow-slate-300/40 
               group-hover:shadow-xl group-hover:shadow-slate-400/30 group-hover:-translate-y-2 
               transition-all duration-300 ease-out 
               [backface-visibility:hidden] flex flex-col p-8"
        >
          {/* ✅ สร้างพื้นที่รูปภาพที่มีขนาดแน่นอน และเพิ่มวงกลมตกแต่งด้านหลังเพื่อสร้างจุดสนใจ */}
          <div className="relative w-full h-[220px] mb-6">
            {/* วงกลมตกแต่งพื้นหลัง */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-48 h-48 bg-emerald-100/70 rounded-full blur-lg"></div>
            </div>

            {/* รูปภาพ */}
            <Image
              src={imageVeg}
              alt={title}
              layout="fill"
              objectFit="contain"
              className="z-10 drop-shadow-lg" // ✅ เพิ่ม drop-shadow ให้รูปภาพดูเด่นขึ้น
            />
          </div>

          {/* ✅ ปรับปรุงส่วนเนื้อหาให้มีลำดับชั้นชัดเจนขึ้น */}
          <div className="flex-grow flex flex-col justify-center text-center">
            {/* เพิ่มหมวดหมู่หรือ Tagline */}
            <p className="text-sm font-semibold text-emerald-600 mb-1">
              ผักสวนครัว
            </p>

            {/* ปรับฟอนต์ให้ดูนุ่มนวลแต่ยังคงหนักแน่น */}
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              {title}
            </h3>
          </div>
        </div>
        {/* 🔴 ด้านหลังของการ์ด (Back Face) - Focus on Content */}
        <div className="absolute inset-0 bg-green-50 rounded-2xl shadow-xl ring-1 ring-green-100 group-hover:shadow-2xl transition-all duration-300 ease-in-out [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 flex flex-col justify-start overflow-auto">
          {/* หัวข้อด้านหลังที่ดูหนักแน่นขึ้น */}
          <h4 className="text-xl font-extrabold text-green-900 mb-4 border-b-2 border-green-300 pb-2 text-center sticky top-0 bg-green-50 z-10">
            ลักษณะของ {title}
          </h4>

          <p className="text-gray-700 text-base leading-relaxed text-left flex-grow">
            {backDescription}
          </p>

          {/* Footer เล็กๆ */}
          <div className="flex-shrink-0 text-xs text-gray-500 mt-4 pt-2 border-t border-green-200 text-center">
            คลิกเพื่อดูรูปภาพ
          </div>
        </div>
      </div>
    </div>
  );
}
