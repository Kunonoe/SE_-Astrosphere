"use client"
import { useState } from "react";

export default function Astrosphere() {
  const [review, setReview] = useState("");

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-center text-3xl font-extrabold mb-6">ASTROSPHERE</h1>
      
      <div className="flex justify-center gap-4">
        {/* การ์ดหลัก */}
        <div className="w-56 p-4 bg-purple-800 border-2 border-purple-500 rounded-lg">
          <div className="p-4">
            <img
              src="./card.jpg"//ใส่รูป
              alt="Astro Card"
              className="rounded-lg mb-2"
            />
            <p className="text-center text-lg">แม่นมากเลยค่ะ ตรงสุดๆ</p>
          </div>
        </div>

        {/* การ์ดของ User อื่น */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-56 h-64 flex items-center justify-center border-2 border-purple-500 bg-purple-700 rounded-lg"
          >
            <p className="text-gray-400 text-center">คำทำนาย User อื่น</p>
          </div>
        ))}
      </div>

      {/* ส่วนรีวิว */}
      <div className="mt-6 flex flex-col items-center">
        <textarea
          className="w-2/3 p-3 rounded-lg bg-purple-900 border-2 border-purple-500 text-white"
          placeholder="Review......"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg">
          Share
        </button>
      </div>
    </div>
  );
}
