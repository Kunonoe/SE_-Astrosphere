"use client";
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import Logo from "@/assets/logo.png"

export default function page() {
    const [username, SetUsername] = useState<string>("");
    const [password, SetPassword] = useState<string>("");
    return (

        <div className='w-full h-[90vh] flex justify-center items-center'>
            <main className='w-full h-full flex justify-around items-center'>
                <Image src={Logo} alt="Pic2" width={400} height={400}></Image>
                
                <div className="h-fit flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-lg">
                    <span className='text-[50px] font-semibold text-white'>Login</span>
                    <div className='flex flex-col gap-5 mt-10'>

                        {/* Username */}
                        <div className='flex flex-col gap-1'>
                                <span className='text-white'>Username : </span>
                                <input type="text" name="username" placeholder='Enter your name'
                                    className="w-[350px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                                    value={username}
                                    onChange={(e) => SetUsername(e.target.value)}
                                />
                            </div>

                            {/* Password */}
                            <div className='flex flex-col gap-1'>
                                <span className='text-white'>Password : </span>
                                <input type="text" name="Enter your lastname" placeholder='Enter your lastname'
                                    className="w-[350px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                                    value={password}
                                    onChange={(e) => SetPassword(e.target.value)}
                                />
                            </div>
                    </div>
                    <div className="flex justify-between items-center gap-5 mt-4 text-white text-sm">
                        <Link href="/register" className="hover:underline cursor-pointer">
                            Don't have an account?
                        </Link>

                        <Link href="/forgetPassword" className="hover:underline cursor-pointer">
                            Forgot password?
                        </Link>
                    </div>

                    <button className="w-full mt-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition">
                        Login
                    </button>
                    <p className="text-gray-600 text-xs mt-5">©2025 AstrosphereTeams</p>
                </div>
            </main>
        </div>
    )
}

