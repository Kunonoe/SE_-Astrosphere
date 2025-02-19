"use client";
import {useState} from 'react'
import Image from 'next/image'
import Pic2 from "@/assets/pic2.png"

export default function page() {
    const [name,SetName] = useState<string>("");
    const [lastname,SetLastname] = useState<string>("");
    const [email,SetEmail] = useState<string>("");
    const [password,SetPassword] = useState<string>("");

  return (
    <main className='w-full h-screen flex justify-around items-center'>
        <Image src={Pic2} alt = "Pic2" width={400} height={400}></Image>

        {/* Register */}
        <div className="h-fit flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-lg"> 
            <span className='text-[50px] font-semibold text-white'>Register</span>
            <div className='flex flex-col gap-5 mt-10'>
                {/* Name */}
                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Name : </span>
                    <input type="text" name="username" placeholder='Enter your name'
                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                    value={name}
                    onChange={(e)=>SetName(e.target.value)}
                    />
                </div>
                
                {/* Lastname */}
                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Lastname : </span>
                    <input type="text" name="Enter your lastname" placeholder='Enter your lastname' 
                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                    value={lastname}
                    onChange={(e)=>SetLastname(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Email : </span>
                    <input type="text" name="Enter your email" placeholder='Enter your email' 
                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                    value={email}
                    onChange={(e)=>SetEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className='flex flex-col gap-1'>
                    <span className='text-white'>Password : </span>
                    <input type="password" name="password" placeholder='password' 
                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                    value={password}
                    onChange={(e)=>SetPassword(e.target.value)}
                    />
                </div>
            </div>
            
            <button className='px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg mt-5'>Confirm</button> 
        </div>
          
    </main>
  )
}

