"use client";
import { useState, useEffect } from "react";

export default function SendTextFuture() {
    const [message, setMessage] = useState(""); // สถานะข้อความ
    const [time, setTime] = useState(new Date()); // สถานะเวลา

    // ตั้งค่าให้เวลาอัพเดททุกๆ วินาที
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // คำนวณองศาของเข็มนาฬิกา
    const hoursDeg = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;
    const minutesDeg = (time.getMinutes() + time.getSeconds() / 60) * 6;
    const secondsDeg = time.getSeconds() * 6;

    // ฟังก์ชันจัดรูปแบบเวลา
    const formatTime = (date) => {
        if (!(date instanceof Date)) return "Loading...";
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    // ฟังก์ชันจัดรูปแบบวันที่
    const formatDate = (date) => {
        if (!(date instanceof Date)) return "Loading...";
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <main className="w-full h-full flex justify-around items-center">
                {/* นาฬิกาอนาล็อก */}
                <div className="relative w-64 h-64">
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

                {/* กล่องข้อความ */}
                <div className="flex flex-col items-center">
                    <textarea
                        className="w-96 h-48 p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 rounded-lg focus:outline-none"
                        placeholder="Type your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    {/* ปุ่ม */}
                    <div className="mt-4 flex gap-4">
                        <button className="px-4 py-2 bg-white text-black rounded-md">Day</button>
                        <button className="px-4 py-2 bg-white text-black rounded-md">Month</button>
                    </div>

                    {/* ปุ่มส่ง */}
                    <button className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg">
                        Send
                    </button>
                </div>
            </main>
        </div>
    );
}