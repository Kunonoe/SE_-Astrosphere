"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";

interface LoginResponse {
  status: string;
  message?: string;
  token?: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Reset error before request

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server Error: ${response.status} - ${text}`);
      }

      const data: LoginResponse = await response.json();
      console.log("✅ Login Response:", data);

      if (data.status === "success" && data.token) {
        localStorage.setItem("token", data.token); // Store token in localStorage
        router.push("/menu"); // Redirect to menu page
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <main className="w-full h-full flex justify-around items-center">
        <Image src={Logo} alt="Logo" width={400} height={400} />

        <div className="h-fit flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-lg">
          <span className="text-[50px] font-semibold text-white">Login</span>
          
          <div className="flex flex-col gap-5 mt-10">
            {/* Username */}
            <div className="flex flex-col gap-1">
              <span className="text-white">Username:</span>
              <input 
                type="text" 
                name="username" 
                placeholder="Enter your username"
                className="w-[350px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <span className="text-white">Password:</span>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter your password"
                className="w-[350px] rounded-md p-2 bg-white/20 backdrop-blur-md text-white placeholder-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-3">{error}</p>}

          {/* Links */}
          <div className="flex justify-between items-center gap-5 mt-4 text-white text-sm">
            <Link href="/register" className="hover:underline cursor-pointer">
              Don't have an account?
            </Link>
            <Link href="/forgetPassword" className="hover:underline cursor-pointer">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button 
            onClick={handleLogin} 
            className={`w-full mt-6 py-2 font-semibold rounded-md transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-600 text-xs mt-5">©2025 AstrosphereTeams</p>
        </div>
      </main>
    </div>
  );
}
