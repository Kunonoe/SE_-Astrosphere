"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";

export default function RegisterPage() {
    const [username, setUsername] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmpassword, setConfirmPassword] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleRegister = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (password !== confirmpassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            console.log(1);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,    // Changed from name → username
                    firstname,
                    email,
                    password,
                    confirmpassword   // Changed from birthdate → birthday
                }),
            });
            console.log(2);
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status} - ${await response.text()}`);
            }

            const data = await response.json();
            setSuccess("Registration successful!");
            console.log("✅ Register Response:", data);
        } catch (error) {
            console.log(error);
            setError("An unknown error occurred");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <main className='w-full h-full flex justify-around items-center'>
                <Image src={Logo} alt="Logo" width={350} height={350} />

                <div className="h-fit flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg p-7 rounded-2xl shadow-lg">
                    <span className='text-[45px] font-semibold text-white'>Register</span>
                    <div className='flex flex-col gap-5 mt-8'>
                        <div className='flex justify-center items-center gap-5'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white text-[15px]'>UserName:</span>
                                <input type="text" placeholder='Enter your name' className="text-[13px] w-[275px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white text-[15px]'>Firstname:</span>
                                <input type="text" placeholder='Enter your lastname' className="text-[13px] w-[275px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-5'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white text-[15px]'>Email:</span>
                                <input type="email" placeholder='Enter your email' className="text-[13px] w-[275px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white text-[15px]'>Date of Birth:</span>
                                <input type="date" className="text-[13px] w-[275px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-5'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white text-[15px]'>Password:</span>
                                <input type="password" placeholder='Password' className="text-[13px] w-[275px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='text-white text-[15px]'>Confirm Password:</span>
                                <input type="password" placeholder='Confirm password' className="text-[13px] w-[275px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    {error && <p className='text-red-500 mt-3'>{error}</p>}
                    {success && <p className='text-green-500 mt-3'>{success}</p>}
                    <button onClick={handleRegister} disabled={loading} className='px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg mt-5'>
                        {loading ? "Registering..." : "Sign up"}
                    </button>
                </div>
            </main>
        </div>
    );
}
