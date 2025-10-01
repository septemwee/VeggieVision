import React from 'react';
import Image from 'next/image';

// ไอคอนเครื่องหมายบวก
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

/**
 * ModernProductCard Component
 * ดีไซน์การ์ดที่เน้นความโมเดิร์นและมีมิติ
 * @param {object} props
 * @param {string | object} props.imageUrl - URL หรือ object รูปภาพ
 * @param {string} props.category - หมวดหมู่สินค้า
 * @param {string} props.title - ชื่อสินค้า
 * @param {string} props.description - คำอธิบายสั้นๆ
 * @param {number} props.price - ราคา
 */
export default function Card({
    imageVeg,title
}) {
    return (
        <div className="relative m-6 overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out w-full max-w-xs pt-10 text-center">
            <div className=" h-full w-full mx-auto ">
                <Image
                    src={imageVeg}
                    alt={title}
                    objectFit="contain"
                />
            </div>

            {/* ส่วนเนื้อหา */}
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{title}</h3>
            </div>
        </div>
    );
}