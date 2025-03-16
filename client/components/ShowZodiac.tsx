"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import axios from "axios";
import Image from 'next/image'

export default function Showcard() {
  const [cardImage, setCardImage] = useState("");
  const [cardName, setCardName] = useState("");
  const [prediction, setPrediction] = useState("");
  const searchParams = useSearchParams(); 
  const birthdate = searchParams.get("birthdate");
  const birthtime = searchParams.get("birthtime"); 
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/zodiac`,{
            birthdate: birthdate,
            birthtime: birthtime
        },{});
        const zodiacdata = response.data;
        setCardImage(zodiacdata.zodiacImage);
        setCardName(zodiacdata.englishZodiac);
        setPrediction(zodiacdata.zodiacPrediction);
      } catch (error) {
        console.error("❌ Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [birthdate,birthtime]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4">
      <span className="text-[50px] font-semibold text-white">YOUR CARD</span>
      <div className="flex justify-center mx-20 p-10 w-full">
        
        <div className="relative w-[300px] h-[400px] rounded-5xl overflow-hidden shadow-5xl mr-10">
          <Image width={100} height={100} src={`/cards/${cardImage}.jpg`} alt={cardName} className="w-full h-full object-cover bg-white/30 rounded-2xl" />
        </div>

        {/* ช่องแสดงผลคำทำนาย */}
        <div className="w-[600px] h-[400px] bg-white/20 rounded-2xl p-6 shadow-lg text-white flex flex-col justify-center items-center gap-4 ml-10">
          <h2 className="text-2xl mb-2">{cardName}</h2> {/* ✅ แสดงชื่อไพ่ */}
          <div className="flex gap-8 justify-center w-full">
            <p className="text-base">{prediction}</p> {/* ✅ แสดงคำทำนาย */}
          </div>
        </div>
      </div>

      <div className="mt-2 w-[550px] flex justify-end gap-5">
        <button className=" bg-gray-300/95 hover:bg-white/60 text-black font-semibold py-2 px-4 rounded-2xl transition">
          Review
        </button>
        <button className=" bg-gray-300/95 hover:bg-white/60 text-black font-semibold py-2 px-4 rounded-2xl transition">
          Share
        </button>
      </div>
    </div>
  );
}