"use client";
import {useState} from 'react'
import Image from 'next/image'
import Pic2 from "@/assets/pic2.png"

export default function page() {
    const [username,SetUsername] = useState<string>("");
    const [password,SetPassword] = useState<string>("");
  return (
    <main className='w-full h-screen flex justify-around items-center'>
        <Image src={Pic2} alt = "Pic2" width={400} height={400}></Image>
        <div className=' h-fit flex flex-col items-center justify-center'>
            <span className='text-[50px] font-semibold text-white'>Login</span>
            <div className='flex flex-col gap-5 mt-10'>
                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Username : {username}</span>
                    <input type="text" name="username" placeholder='username' className=' w-[300px] rounded-md p-2'
                    value={username}
                    onChange={(e)=>SetUsername(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Password : {password}</span>
                    <input type="password" name="password" placeholder='password' className='w-[300px] rounded-md p-2'
                     value={password}
                    onChange={(e)=>SetPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className='flex justify-between items-center gap-5 mt-2 text-white'>
                <span>Don't have an account?</span>
                <span>Forgot password?</span>
            </div>
            <button className='px-5 py-2 bg-gray-300 rounded-lg mt-5'>Login</button>
        </div>
          
    </main>
  )
}

