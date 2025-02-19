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
        <div className="h-fit flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-lg"> 
            <span className='text-[50px] font-semibold text-white'>Register</span>
            <div className='flex flex-col gap-5 mt-10'>
                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Name : {username}</span>
                    <input type="text" name="username" placeholder='username' className=' w-[300px] rounded-md p-2'
                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                    value={username}
                    onChange={(e)=>SetUsername(e.target.value)}
                    />
                </div>
                
                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Lastname : {password}</span>
                    <input type="password" name="password" placeholder='password' 
                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                    value={password}
                    onChange={(e)=>SetPassword(e.target.value)}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Email : {password}</span>
                    <input type="password" name="password" placeholder='password' 
                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                    value={password}
                    onChange={(e)=>SetPassword(e.target.value)}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Password : {password}</span>
                    <input type="password" name="password" placeholder='password' 
                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                    value={password}
                    onChange={(e)=>SetPassword(e.target.value)}
                    />
                </div>
            </div>
            
            <button className='px-5 py-2 bg-emerald-600 rounded-lg mt-5'>Confirm</button> 
        </div>
          
    </main>
  )
}

