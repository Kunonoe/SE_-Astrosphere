"use client";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import Logo from "@/assets/logo.png"
import Gg from "@/assets/google.png";
import { auth, provider } from "@/utils/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState<any>(null);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider); // ✅ เปลี่ยนกลับเป็น Popup เพื่อรองรับการดึงข้อมูล
            if (!result.user) {
                throw new Error("User not found in result");
            }

            const idToken = await result.user.getIdToken();
            console.log("✅ ID Token:", idToken);

            // 👉 ส่ง token ไปให้ Backend
            const response = await fetch("http://localhost:8080/api/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: idToken }),
            });

            const data = await response.json();
            console.log("✅ Server Response:", data);
            setUser(result.user);
        } catch (error) {
            console.error("❌ Google Sign-In Error:", error);
            alert("Failed to sign in with Google. Please try again.");
        }
    };
    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <main className='w-full h-full flex justify-around items-center'>
                <Image src={Logo} alt="Logo" width={350} height={350} className="mb-5" />
                <div className="w-[400px] p-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 flex flex-col items-center">
                    <h1 className="text-[50px] font-bold text-white">Login</h1>
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
                    <button className="w-full mt-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition">
                        Login
                    </button>
                    <div className="flex items-center w-full my-5">
                        <div className="flex-grow border-t border-gray-500"></div>
                        <span className="mx-4 text-gray-300 text-sm">or</span>
                        <div className="flex-grow border-t border-gray-500"></div>
                    </div>
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center bg-white/20 text-white py-2 rounded-md hover:bg-white/30 transition">
                        <div className='flex justify-center items-center gap-3'>
                            <Image src={Gg} alt="Google" width={25} height={25} />
                            Sign in with Google
                        </div>
                    </button>
                    <div className="flex justify-between items-center gap-5 mt-4 text-white text-sm">
                        <Link href="/register" className="hover:underline cursor-pointer">
                            Don't have an account?
                        </Link>

                        <Link href="/forgetPassword" className="hover:underline cursor-pointer">
                            Forgot password?
                        </Link>
                    </div>
                    <p className="text-gray-600 text-xs mt-5">©2025 AstrosphereTeams</p>
                </div>
            </main>
        </div>
    );
}