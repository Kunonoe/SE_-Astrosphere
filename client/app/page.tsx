"use client";
// import Image from "next/image";
import Link from "next/link";
import Tarot from "./tarot";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden bg-black">
      <main className="w-full h-[100vh] flex justify-around items-center relative px-20">
        <div className="flex items-center w-full h-full bg-cover bg-center relative">

          <div className="pl-10 md:pl-20 pb-56 md:pb-20 flex flex-col gap-3  max-w-[600px] mt-16">
            <h1 className="text-[50px] text-white font-semibold whitespace-nowrap">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">
                Astrosphere
              </span>
            </h1>

            <p className="text-[20px] text-gray-200 hidden md:block">
              Empowering you to understand life is journey through the stars above.
              Experience the fusion of astrology and astronomy, lighting the way to your inspiration.
            </p>

            <div className="flex-col md:flex-row hidden md:flex gap-5">
              <Link
                href="/login"
                className="rounded-[20px] group relative bg-purple-600 font-semibold hover:bg-purple-700 transition px-5 py-3 text-lg text-white max-w-[200px]"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="rounded-[20px] group relative px-5 border bg-white/20  border-white/20 backdrop-blur-md py-3 text-lg text-white max-w-[200px]"
              >
                <div className="absolute rounded-[20px] z-[1] bg-white inset-0 opacity-0 group-hover:opacity-20" />
                Register
              </Link>
            </div>
          </div>
          <div className="absolute right-[30%] top-[25%] transform -translate-y-1/2 scale-110">
            <Tarot />
          </div>
        </div>

      </main>
    </div>
  );
}
