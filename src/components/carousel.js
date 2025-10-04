'use client';

import { useEffect, useRef, useState } from 'react';

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
 */
export default function Carousel({ children }) {
    const scrollContainerRef = useRef(null);
    // isAtStart เริ่มเป็น true เพราะเราจะบังคับให้มันอยู่ที่ซ้ายสุด
    const [isAtStart, setIsAtStart] = useState(true); 
    const [isAtEnd, setIsAtEnd] = useState(false);
    
    const cardGap = 16; // gap-4 ใน Tailwind CSS คือ 16px
    
    // 2. ฟังก์ชันสำหรับเลื่อน (ไม่เปลี่ยนแปลง)
    const handleScroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const firstCard = container.querySelector('.flex-shrink-0');
            if (!firstCard) return;

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

    // 3. ฟังก์ชันสำหรับตรวจสอบสถานะการ scroll (ไม่เปลี่ยนแปลง)
    const checkScrollPosition = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            // ใช้ buffer 10px ในการตัดสินใจ
            setIsAtStart(scrollLeft <= 10); 
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
        }
    };

    // 4. ใช้ useEffect เพื่อตั้งค่าเริ่มต้นและจัดการ Event Listener
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            // 🔴 การแก้ไขหลัก: บังคับ Scroll เป็น 0 ด้วย setTimeout(0)
            // เพื่อให้มั่นใจว่ารันหลังจากการคำนวณ DOM/Snap เสร็จสมบูรณ์
            setTimeout(() => {
                const originalScrollBehavior = container.style.scrollBehavior;
                
                // ปิด smooth scroll ชั่วคราว
                container.style.scrollBehavior = 'auto'; 
                
                // **บังคับตั้งค่า scrollLeft เป็น 0**
                container.scrollLeft = 0;
                
                // คืนค่า scroll-behavior เดิม
                container.style.scrollBehavior = originalScrollBehavior;

                checkScrollPosition();
            }, 0); 
        }

        // Listener สำหรับ Resize
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, []); // Run only once on mount

    // 5. เพิ่ม event listener ให้ checkScrollPosition ทำงานเมื่อมีการเลื่อน (ไม่เปลี่ยนแปลง)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, []);


    return (
        // Container หลัก: กำหนดพื้นที่การ์ดจะแสดงผล
        <div className="relative w-full max-w-5xl mx-auto px-8 "> 
            
            {/* ปุ่มเลื่อนซ้าย */}
            {/* {!isAtStart && (
                <button 
                    onClick={() => handleScroll('left')} 
                    // ปรับตำแหน่ง: left-0, -translate-x-1/2 
                    className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition"
                    aria-label="Previous"
                >
                    <ChevronLeftIcon />
                </button>
            )} */}

            {/* Container ที่จะ scroll */}
            <div 
                ref={scrollContainerRef}
                className="flex items-stretch gap-4 py-6 -mx-4 px-4 snap-x snap-start hide-scrollbar"
            >
                {children}
            </div>

            {/* ปุ่มเลื่อนขวา */}
            {/* {!isAtEnd && (
                <button 
                    onClick={() => handleScroll('right')}
                    // ปรับตำแหน่ง: right-0, translate-x-1/2 
                    className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition"
                    aria-label="Next"
                >
                    <ChevronRightIcon />
                </button>
            )} */}
        </div>
    );
}