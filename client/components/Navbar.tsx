"use client";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from "next/navigation";
import axios from "axios";
import {deleteCookie , getCookie} from 'cookies-next/client';

export default function Navbar() {
  // const router = useRouter();
  const token = getCookie('token');
  const Logout=()=>{
    const fetchCardData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/logout`,{

        },{});
        const data = response.data;
        console.log(data)
        if(data.status == "success"){
          deleteCookie('token');
          // router.push("/login"); 
          window.location.reload();
        }
      } catch (error) {
        console.error("❌ Error fetching card data:", error);
      }
    };

    fetchCardData();
  }
  return (
    <main className='w-full p-2 flex items-center bg-violet-900/40'>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center px-24">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />

          <span className='text-[15px] font-semibold text-white font-Head ml-2'>
            ASTROSPHERE
          </span>
        </div>

        <div className="flex w-1/3 justify-between px-20">
          <Link href="/menu" className='text-[18px] font-semibold text-white'>
            Menu
          </Link>

          <Link href="/profile" className='text-[18px] font-semibold text-white'>
            Profile
          </Link>


          {token ? (
              <button className='text-[18px] font-semibold text-white' onClick={Logout}>
              Log Out
            </button>
            ) : (
              <Link href="/login" className='text-[18px] font-semibold text-white'>
                Log In
              </Link>
          )}
        </div>
      </div>
    </main>
  )
}