"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function Showcard() {
  const [cardImage, setCardImage] = useState("");
  const [cardName, setCardName] = useState("");
  const [prediction, setPrediction] = useState("");
  const searchParams = useSearchParams();
  const cardID = searchParams.get("id");
  const router = useRouter(); 

  useEffect(() => {
    if (!cardID) return;

    const fetchCardData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/gettarot/${cardID}`);
        const cardData = response.data;
        setCardImage(cardData.cardPHOTO);
        setCardName(cardData.cardNAME);
        setPrediction(cardData.cardMEANING);
      } catch (error) {
        console.error("❌ Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [cardID]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4">
      <span className="text-[50px] font-semibold text-white">YOUR CARD</span>
      <div className="flex justify-center mx-20 p-10 w-full">
        
        <div className="relative w-[300px] h-[400px] rounded-5xl overflow-hidden shadow-5xl mr-10">
          <Image width={100} height={100} src={`/cards/${cardImage}.jpg`} alt={cardName} className="w-full h-full object-cover bg-white/30 rounded-2xl" />
        </div>

        <div className="w-[600px] h-[400px] bg-white/20 rounded-2xl p-6 shadow-lg text-white flex flex-col justify-center items-center gap-4 ml-10">
          <h2 className="text-2xl mb-2">{cardName}</h2>
          <div className="flex gap-8 justify-center w-full">
            <p className="text-base">{prediction}</p>
          </div>
        </div>
      </div>

      {/* ปุ่ม Back */}
      <div className="mt-2 w-[550px] flex justify-end">
        <button 
          onClick={() => router.push("/tarotcard")} // ✅ ใช้ router.push() อย่างถูกต้อง
          className="bg-gray-300/95 hover:bg-white/60 text-black font-semibold py-2 px-6 rounded-2xl transition">
          Back
        </button>
      </div>
    </div>
  );
}
