"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import cardBack from "@/assets/card.jpg";
import { useRouter } from "next/navigation"; 
import Loading from "../../loading"
export default function CardPicker() {
  const [cards, setCards] = useState<any[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tarotall");
        const data = await response.json();
        
        setCards(data.cards.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("❌ Error fetching tarot cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleCardClick = (cardID: number) => {
    router.push(`/showcard?id=${cardID}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 relative"
      style={{
        backgroundImage: "url('/bg6.jpeg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-white text-3xl font-bold mb-6">PICK YOUR CARD</h1>
      <div className="grid grid-cols-8 gap-4">
        {
          cards.map((card, index) => (
            <div
              key={index}
              className="relative w-24 h-36 cursor-pointer transform transition duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCardClick(card.cardID)}
            >
              <Image
                src={cardBack} 
                alt={card.cardID}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg shadow-lg ${hoveredIndex === index ? "scale-110" : "scale-100"}`}
              />
            </div>
          ))}

      </div>
    </div>
  );
}
