"use client";
import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null); // เริ่มต้นเป็น null เพื่อเลี่ยง SSR mismatch

    useEffect(() => {
        setTime(new Date()); // เซ็ตค่าเวลาหลังจากที่ไคลเอนต์โหลดแล้ว
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return <p className="text-black text-xl">Loading...</p>;

    // คำนวณองศาของเข็มนาฬิกา
    const hoursDeg = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;
    const minutesDeg = (time.getMinutes() + time.getSeconds() / 60) * 6;
    const secondsDeg = time.getSeconds() * 6;

    // ฟังก์ชันจัดรูปแบบเวลา
    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    // ฟังก์ชันจัดรูปแบบวันที่
    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <div className="flex justify-center items-center">
            <main className="w-full h-full flex justify-around items-center">
                {/* นาฬิกาอนาล็อก */}
                <div className="relative w-80 h-80">
                    <div className="w-full h-full bg-gradient-to-b from-yellow-700 to-yellow-900 border-4 border-yellow-500 rounded-full flex items-center justify-center relative">
                        {/* ตัวเลขโรมัน */}
                        {["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"].map(
                            (num, index) => {
                                const angle = (index * 30 * Math.PI) / 180;
                                const x = 50 + Math.cos(angle) * 40;
                                const y = 50 + Math.sin(angle) * 40;
                                return (
                                    <span
                                        key={index}
                                        className="absolute text-yellow-300 font-bold text-lg"
                                        style={{
                                            left: `${x}%`,
                                            top: `${y}%`,
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    >
                                        {num}
                                    </span>
                                );
                            }
                        )}

                        {/* เข็มนาฬิกา */}
                        <div
                            className="absolute w-2 h-20 bg-yellow-300 origin-bottom"
                            style={{ transform: `rotate(${hoursDeg}deg)`, bottom: "50%", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
                        ></div>
                        <div
                            className="absolute w-1.5 h-28 bg-white origin-bottom"
                            style={{ transform: `rotate(${minutesDeg}deg)`, bottom: "50%", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
                        ></div>
                        <div
                            className="absolute w-1 h-32 bg-red-500 origin-bottom"
                            style={{ transform: `rotate(${secondsDeg}deg)`, bottom: "50%", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
                        ></div>

                        {/* จุดศูนย์กลาง */}
                        <div className="absolute w-4 h-4 bg-red-700 rounded-full"></div>

                        {/* นาฬิกาดิจิทอล */}
                        <div className="absolute inset-5 flex flex-col items-center justify-between py-10">
                            <p className="text-black text-xl">{formatTime(time)}</p>
                            <p className="text-black text-xl">{formatDate(time)}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
