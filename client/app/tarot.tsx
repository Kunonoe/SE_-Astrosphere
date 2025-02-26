"use client";
import { useEffect } from 'react';
import Image from 'next/image';

export default function TarotCard() {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes bounce {
        0%, 100% {
          transform: translateY(10px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      .animate-bounce {
        animation: bounce 2s infinite;
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
      <div className="relative animate-bounce transition-transform duration-700">
        <div className="absolute w-[200px] h-[300px] transform rotate-[-15deg]">
          <Image unoptimized width={100} height={100}
            src="./tarot-front.png"
            alt="Tarot Card Back"
            className="w-full h-full rounded-[10px] shadow-lg"
          />
          <div className="absolute bottom-[-20px] left-1/2 w-[200px] h-[20px] bg-black bg-opacity-30 blur-md transform -translate-x-1/2"></div>
        </div>

        <div className="absolute w-[200px] h-[300px] left-[25px] transform rotate-[0deg]">
          <Image unoptimized width={100} height={100}
            src="./tarot-front.png"
            alt="Tarot Card Back"
            className="w-full h-full rounded-[10px] shadow-lg"
          />
          <div className="absolute bottom-[-20px] left-1/2 w-[200px] h-[20px] bg-black bg-opacity-30 blur-md transform -translate-x-1/2"></div>
        </div>
        
        <div className="absolute w-[200px] h-[300px] left-[50px] transform rotate-[15deg]">
          <Image unoptimized width={100} height={100}
            src="./tarot-front.png"
            alt="Tarot Card Back"
            className="w-full h-full rounded-[10px] shadow-lg"
          />
          <div className="absolute bottom-[-20px] left-1/2 w-[200px] h-[20px] bg-black bg-opacity-30 blur-md transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}