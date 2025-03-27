"use client";
import "./Hourglass.css";
import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next"; // ✅ ใช้ cookies-next
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    userId: string;
}

export default function SendTextFuture() {
    const [message, setMessage] = useState<string>(""); // ข้อความ
    const [date, setDate] = useState<string>(""); // วันที่
    const [loading, setLoading] = useState<boolean>(false);
    const [userID, setUserID] = useState<string | null>(null);

    // ✅ ดึง userID จาก Token ใน Cookie
    useEffect(() => {
        try {
            const token = getCookie("token"); // ✅ ใช้ cookies-next ดึง Token
            if (token) {
                const decoded: DecodedToken = jwtDecode(token as string);
                setUserID(decoded.userId); // ✅ เซ็ตค่า userID
            }
        } catch (error) {
            console.error("❌ Failed to decode token:", error);
        }

        // ✅ ตั้งค่าวันที่เริ่มต้นเป็นพรุ่งนี้
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow.toISOString().split("T")[0]); // YYYY-MM-DD
    }, []);

    const handleSendMessage = async () => {
        if (!message.trim()) {
            Swal.fire({
                title: "Error",
                text: "Please enter a message before sending!",
                icon: "error",
                confirmButtonColor: "#4527a0",
            });
            return;
        }

        if (!date) {
            Swal.fire({
                title: "Error",
                text: "Please select a date and time for the message to be sent!",
                icon: "error",
                confirmButtonColor: "#4527a0",
            });
            return;
        }

        if (!userID) {
            Swal.fire({
                title: "Error",
                text: "User not authenticated! Please log in again.",
                icon: "error",
                confirmButtonColor: "#4527a0",
            });
            return;
        }

        setLoading(true);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/message`,
                { userID, content: message, sendDate: date }, // ✅ ส่ง `sendTime` และ `sendDate` ไปด้วย
                { withCredentials: true } // ✅ ส่ง Cookie ไปกับ Request
            );

            Swal.fire({
                title: "Successful!",
                text: "Your message has been scheduled successfully! Thank you!",
                icon: "success",
                confirmButtonColor: "#4527a0",
            });

            setMessage(""); // รีเซ็ตข้อความหลังจากส่งสำเร็จ
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    title: "Error",
                    text: error.response?.data?.message || "Failed to schedule message",
                    icon: "error",
                    confirmButtonColor: "#4527a0",
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "An unexpected error occurred",
                    icon: "error",
                    confirmButtonColor: "#4527a0",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-[90vh] flex flex-col justify-center items-center">
            {/* หัวข้อ */}
            <h1 className="text-[40px] font-bold text-white mt-20">
                What would you like to tell yourself in the future?
            </h1>

            <main className="w-full h-full flex justify-center items-start mt-16 gap-56">
                {/* นาฬิกาทราย */}
                <div className="w-[300px] h-fit flex justify-center items-center scale-125 mt-10">
                    <div className="hourglass">
                        <div className="frame">
                            <div className="top"></div>
                            <div className="bottom">
                                <div className="drip"></div>
                                <div className="glass"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* กล่องข้อความ */}
                <div className="flex flex-col items-center">
                    <textarea
                        className="w-[450px] h-[300px] p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 rounded-lg focus:outline-none"
                        placeholder="Type your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    {/* วันที่และเวลา */}
                    <div className="flex flex-col gap-3 mt-5">
                        {/* Input วันที่ */}
                        <div className="flex items-center gap-2 px-4 py-2 justify-between w-[350px] border bg-white/10 backdrop-blur-md rounded-lg text-white shadow-md">
                            <input
                                type="date"
                                className="bg-transparent text-white focus:outline-none w-full"
                                value={date}
                                min={new Date().toISOString().split("T")[0]} // ✅ ห้ามเลือกวันที่ย้อนหลัง
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* ปุ่มส่ง */}
                    <button
                        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 disabled:bg-gray-500"
                        onClick={handleSendMessage}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </div>
            </main>
        </div>
    );
}
