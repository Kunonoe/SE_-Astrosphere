"use client";
import { useState } from 'react';
import Image from 'next/image';
import Logo from "@/assets/logo.png";

export default function ForgetPassword() {
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmpassword, setConfirmPassword] = useState<string>("");

    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <main className='w-full h-full flex justify-around items-center'>
                <Image src={Logo} alt="Logo" width={350} height={350} />

                <div className="h-fit flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-lg">
                    <span className='text-[40px] font-semibold text-white'>Forgot Password</span>
                    <div className='flex flex-col gap-5 mt-10'>

                        {/* Email */}
                        <div className='w-full flex justify-start items-center gap-5'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white'>Email : </span>
                                <input type="text" name="email" placeholder='Enter your email'
                                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button className='px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg mt-5'>Send</button>
                        </div>

                        {/* OTP */}
                        <div className='flex flex-col gap-1'>
                            <span className='text-white'>OTP : </span>
                            <input type="text" name="otp" placeholder='Enter your OTP'
                                className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-center items-center gap-5'>
                            {/* Password */}
                            <div className='flex flex-col gap-1'>
                                <span className='text-white'>Password : </span>
                                <input type="password" name="password" placeholder='password'
                                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className='flex flex-col gap-1'>
                                <span className='text-white'>Confirm Password : </span>
                                <input type="password" name="confirmPassword" placeholder='confirm password'
                                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button className='px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg mt-5'>Confirm</button>
                </div>
            </main>
        </div>
    );
}