"use client"
// pages/astrosphere.js
import { useState } from "react";
import Image from 'next/image'

export default function Astrosphere() {
  const [review, setReview] = useState("");

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-center text-3xl font-extrabold mb-6">ASTROSPHERE</h1>
      
      <div className="flex md:flex-row justify-center items-center gap-6">
        {/* Astro Card */}
        <div className="w-80 p-4 bg-purple-800 border-2 border-purple-500 rounded-lg">
          <Image
            src="./card.jpg"
            alt="Astro Card"
            className="rounded-lg w-full"
          />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md">
          {/* First Textarea */}
          <textarea
            className="w-full h-32 p-3 rounded-lg bg-purple-900 border-2 border-purple-500 text-white"
            placeholder="คำทำนาย......"
          ></textarea>

          {/* Second Textarea for Review */}
          <textarea
            className="w-full h-32 p-3 rounded-lg bg-purple-900 border-2 border-purple-500 text-white"
            placeholder="Review......"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>

          {/* Share Button */}
          <button className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg w-full">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
