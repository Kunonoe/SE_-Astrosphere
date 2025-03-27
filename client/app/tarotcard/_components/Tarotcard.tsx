"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Image from 'next/image'
import cardBack from "@/assets/card.jpg";

interface TarotCard {
  cardID: number;
  name: string;
  description?: string;
}

export default function CardPicker() {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/tarotall`);
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
              key={card.cardID}
              className="relative w-24 h-36 cursor-pointer transform transition duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCardClick(card.cardID)}
            >
              <Image
                src={cardBack} 
                alt={`Tarot Card ${card.cardID}`}
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