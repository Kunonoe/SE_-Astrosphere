"use client";
import Magicball from "@/assets/magicball.gif";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Zodiactable() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [zodiacResult, setZodiacResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]); // Set current date
    setTime(new Date().toTimeString().slice(0, 5)); // Set current time (HH:MM)
  }, []);

  const handleCheckZodiac = async () => {
    setLoading(true);
    setError(null);
    setZodiacResult(null);

    try {
      router.push(`/showZodiac?birthdate=${date}&birthtime=${time}`); 
    } catch (error) {
      setError("An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

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
      <button 
        onClick={handleCheckZodiac} 
        className="mt-4 bg-green-600 font-bold px-4 py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Checking..." : "Done"}
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {zodiacResult && <p className="text-green-500 mt-3">Your Zodiac Sign: {zodiacResult}</p>}
    </div>
  );
}
