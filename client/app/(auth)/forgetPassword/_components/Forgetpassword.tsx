"use client";
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Logo from "@/assets/logo.png";

export default function ForgetPassword() {
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSendOtp = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            await axios.post("http://localhost:5000/api/request-otp", { email });
            setMessage("OTP sent successfully! Check your email.");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            await axios.post("http://localhost:5000/api/update-password", {
                email,
                newpassword: password,
                otp
            });
            setMessage("Password reset successful! You can now log in.");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <main className='w-full h-full flex justify-around items-center'>
                <Image src={Logo} alt="Logo" width={350} height={350} />
                <div className="h-fit flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-lg">
                    <span className='text-[40px] font-semibold text-white'>Forgot Password</span>
                    <div className='flex flex-col gap-5 mt-10'>
                        <div className='w-full flex justify-start items-center gap-5'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white'>Email : </span>
                                <input type="text" name="email" placeholder='Enter your email'
                                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button 
                                className='px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg mt-5'
                                onClick={handleSendOtp}
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                        </div>

                        <div className='w-full flex justify-start items-center gap-5'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white'>OTP : </span>
                                <input type="text" name="otp" placeholder='Enter your OTP'
                                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='w-full flex justify-start items-center gap-5'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white'>New Password : </span>
                                <input type="password" name="password" placeholder='Enter new password'
                                    className="w-[300px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button 
                                className='px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg mt-5'
                                onClick={handleResetPassword}
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                    {message && <p className="text-green-500 mt-3">{message}</p>}
                    {error && <p className="text-red-500 mt-3">{error}</p>}
                </div>
            </main>
        </div>
    );
}
