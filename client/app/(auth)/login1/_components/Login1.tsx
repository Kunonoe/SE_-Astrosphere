"use client";
import { useState } from "react";
import Image from 'next/image';
import Logo from "@/assets/logo.png";
import Gg from "@/assets/google.png";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <main className='w-full h-full flex justify-around items-center'>
                <Image src={Logo} alt="Logo" width={350} height={350} className="mb-5" />

                <div className="w-[400px] p-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 flex flex-col items-center">
                    <h1 className="text-[50px] font-bold text-white">Login</h1>

                    {/* ช่องกรอก Email */}
                    <div className="w-full mt-5">
                        <label className="text-white">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 mt-1 bg-white/20 backdrop-blur-md text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="w-full mt-4">
                        <label className="text-white">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 mt-1 bg-white/20 backdrop-blur-md text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* ปุ่ม Login */}
                    <button className="w-full mt-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition">
                        Login
                    </button>

                    {/* เส้น OR */}
                    <div className="flex items-center w-full my-5">
                        <div className="flex-grow border-t border-gray-500"></div>
                        <span className="mx-4 text-gray-300 text-sm">or</span>
                        <div className="flex-grow border-t border-gray-500"></div>
                    </div>

                    {/* Sign in with Google */}
                    <button className="w-full flex items-center justify-center bg-white/20 text-white py-2 rounded-md hover:bg-white/30 transition">
                        <div className='flex justify-center items-center gap-3'>
                            <Image src={Gg} alt="Google Icon" width={25} height={25} />
                            Sign in with Google
                        </div>
                    </button>

                    {/* ลิงก์ "Don't have an account?" และ "Forgot password?" */}
                    <div className="flex justify-between items-center gap-5 mt-4 text-white text-sm">
                        <span className="hover:underline cursor-pointer">Don't have an account?</span>
                        <span className="hover:underline cursor-pointer">Forgot password?</span>
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-400 text-xs mt-5">©2025 AstrosphereTeams</p>
                </div>
            </main>
        </div>
    );
}
