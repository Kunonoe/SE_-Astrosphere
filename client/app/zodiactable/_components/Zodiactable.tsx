"use client"
import Magicball from "@/assets/magicball.gif";
import Image from 'next/image';
import { useState, useEffect } from "react";

export default function Zodiactable() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // ใช้ useEffect เพื่อเซ็ตค่าเริ่มต้นหลังจากที่โหลดฝั่งไคลเอนต์แล้ว
  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]); // กำหนดวันที่ปัจจุบัน
    setTime(new Date().toTimeString().slice(0, 5)); // กำหนดเวลาปัจจุบัน (HH:MM)
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <h1 className="text-4xl font-bold mb-6">CHECK YOUR ZODIAC SIGN</h1>
      <div className="flex space-x-4">
        <Image src={Magicball} alt="Magicball" width={450} height={450} unoptimized />
      </div>
      <div className="mt-6 flex space-x-4">
        <input
          type="date"
          className="p-2 rounded-lg bg-white text-black"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="p-2 rounded-lg bg-white text-black"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button className="mt-4 bg-green-600 font-bold px-4 py-2 rounded-lg">Done</button>
    </div>
  );
}