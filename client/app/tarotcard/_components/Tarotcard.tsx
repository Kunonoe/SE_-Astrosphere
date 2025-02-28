'use client';

import Image from 'next/image';
import { useState } from 'react';
import cardBack from "@/assets/card.jpg"; // Ensure you have this image in the public folder
import bgImage from '/public/bg6.jpeg'; // Use the uploaded image for the background

const cards = new Array(24).fill(null);

export default function CardPicker() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 relative"
      style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <h1 className="text-white text-3xl font-bold mb-6">PICK YOUR CARD</h1>
      <div className="grid grid-cols-6 gap-4">
        {cards.map((_, index) => (
          <div
            key={index}
            className="relative w-24 h-36 cursor-pointer transform transition duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={cardBack}
              alt="Card Back"
              layout="fill"
              objectFit="cover"
              className={`rounded-lg shadow-lg ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}