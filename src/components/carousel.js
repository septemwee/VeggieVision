'use client';

import React, { useRef, useState, useEffect } from 'react';

// ไอคอนลูกศรซ้าย
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

// ไอคอนลูกศรขวา
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);


/**
 * CustomCarousel Component
 * Carousel ที่เขียนขึ้นเองทั้งหมดโดยไม่ใช้ library
 * @param {object} props
 * @param {React.ReactNode} props.children - item ที่จะแสดงใน Carousel
 */
export default function Carousel({ children }) {
    const scrollContainerRef = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    
    // 🔴 กำหนดขนาด gap ของ Card (ต้องตรงกับ gap-4 ใน className ของ div scrollContainerRef)
    const cardGap = 16; // gap-4 ใน Tailwind CSS คือ 16px
    // จำนวน Card ที่แสดงในแต่ละหน้า (ตาม OutputDisplay ที่ใช้ w-1/3)
    const cardsPerPage = 3;

    // 2. ฟังก์ชันสำหรับเลื่อน
    const handleScroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            // 🔴 เปลี่ยน scrollAmount ให้เลื่อนทีละ 1 Card + gap
            // ต้องมั่นใจว่า Card มี w-1/3 และ gap-4 ถูกกำหนดไว้อย่างถูกต้อง
            const firstCard = container.querySelector('.flex-shrink-0'); // อ้างอิง Card ตัวแรก
            if (!firstCard) return;

            // คำนวณความกว้างของ 1 Card (รวม margin ด้านขวาถ้ามี)
            // clientWidth ของ Card 1 ใบ + gap ที่ตามมา
            const scrollAmount = firstCard.clientWidth + cardGap; 
            
            const newScrollLeft = direction === 'right' 
                ? container.scrollLeft + scrollAmount 
                : container.scrollLeft - scrollAmount;
            
            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth' 
            });
        }
    };

    // 3. ฟังก์ชันสำหรับตรวจสอบสถานะการ scroll (เพื่อซ่อน/แสดงปุ่ม)
    const checkScrollPosition = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            // 🔴 ปรับค่า isAtStart/isAtEnd ให้ยืดหยุ่นขึ้นเล็กน้อย
            // ใช้ค่าที่ใกล้เคียง 0 หรือ scrollWidth - clientWidth
            setIsAtStart(scrollLeft <= 10); // buffer 10px
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10); // buffer 10px
        }
    };

    // 4. ใช้ useEffect เพื่อเรียก checkScrollPosition เมื่อ component โหลดเสร็จและ Resize
    useEffect(() => {
        // 🔴 ตั้งค่า scrollLeft เป็น 0 เมื่อโหลดครั้งแรก เพื่อให้ชิดซ้ายสุดเสมอ
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = 0;
        }
        checkScrollPosition();
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, []);

    // 5. เพิ่ม event listener ให้ checkScrollPosition ทำงานเมื่อมีการเลื่อน
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, []);


    return (
        // 🔴 ปรับ class ของ div นอกสุด (relative container)
        // mx-auto จัดให้อยู่กึ่งกลาง, w-full, และเพิ่ม px-4 ให้มี padding ด้านข้าง
        <div className="relative w-full max-w-5xl mx-auto px-4"> 
            {/* ปุ่มเลื่อนซ้าย */}
            {!isAtStart && (
                <button 
                    onClick={() => handleScroll('left')} 
                    // 🔴 ปรับตำแหน่งปุ่ม: ให้มันชิดซ้ายของ div ที่มี px-4
                    className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition"
                    aria-label="Previous"
                >
                    <ChevronLeftIcon />
                </button>
            )}

            {/* Container ที่จะ scroll */}
            <div 
                ref={scrollContainerRef}
                // 🔴 นำ px-6 ออกจากตรงนี้ เพื่อให้ padding ถูกจัดการโดย div ด้านนอก
                // และยังคงมี gap-4 สำหรับช่องว่างระหว่าง Card
                className="flex items-stretch gap-4 py-2 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
            >
                {children}
            </div>

            {/* ปุ่มเลื่อนขวา */}
            {!isAtEnd && (
                <button 
                    onClick={() => handleScroll('right')}
                    // 🔴 ปรับตำแหน่งปุ่ม: ให้มันชิดขวาของ div ที่มี px-4
                    className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition"
                    aria-label="Next"
                >
                    <ChevronRightIcon />
                </button>
            )}
        </div>
    );
}