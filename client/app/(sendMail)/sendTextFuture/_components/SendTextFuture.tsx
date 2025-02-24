"use client";
import "./Hourglass.css";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import Swal from 'sweetalert2'

export default function SendTextFuture() {
    const [message, setMessage] = useState(""); // สถานะข้อความ
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        const today = currentDate.toLocaleDateString("en-GB", {
            day: "2-digit", month: "2-digit", year: "numeric"
        });
        setDate(today);
    }, []);

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

                    {/* วันที่ปัจจุบัน +1ปี */}
                    <div className="flex items-center gap-2 mt-5 px-4 py-2 justify-between w-[350px] border bg-white/10 backdrop-blur-md rounded-lg text-white shadow-md">
                        <span className="text-lg font-semibold">{date}</span>
                        <Calendar size={20} className="text-white" />
                    </div>

                    {/* ปุ่มส่ง */}
                    <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
                        onClick={() => {
                            Swal.fire({
                                title: "Successful!",
                                text: '“Your email has been successfully scheduled to be sent next year!” Thank you!',
                                icon: "success",
                                background: "#ffffff",
                                color: "#000000",
                                confirmButtonColor: "#4527a0"
                            });

                        }}
                    >
                        Send
                    </button>
                </div>
            </main>
        </div>
    );
}