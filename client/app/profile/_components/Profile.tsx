"use client";

import { useState } from "react";
import Link from "next/link";

export default function Pro() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    day: "",
    month: "",
    year: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "day" || name === "month") {
      if (/^\d{0,2}$/.test(value)) setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "year") {
      if (/^\d{0,4}$/.test(value)) setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="flex flex-col items-start justify-start relative text-white h-screen p-10">
      <h1 className="text-[35px] font-semibold">PROFILE</h1>

      <div className="relative mt-4">
        <div className="w-40 h-40 bg-gray-500 rounded-full mx-auto"></div>
        <span className="text-[20px] font-semibold absolute bottom-[-30px] left-1/2 transform -translate-x-1/2">
          Username
        </span>
      </div>

      <div className="flex flex-col mt-10">
       <div className="flex justify-start">
          <span className="text-[18px] font-semibold">Firstname</span>
          <span className="text-[18px] font-semibold ml-2">:</span>
        </div>
       <div className="flex justify-start mt-4">
          <span className="text-[18px] font-semibold">Lastname</span>
          <span className="text-[18px] font-semibold ml-3">:</span>
        </div>
        <div className="flex justify-start mt-4">
          <span className="text-[18px] font-semibold">Email</span>
          <span className="text-[18px] font-semibold ml-3">:</span>
        </div>
      </div>
      <div className="flex flex-col mt-1">
        <button
          onClick={() => setActiveTab(activeTab === "history" ? null : "history")}
          className={`px-10 py-2 border-2 font-bold rounded-lg mt-5 w-56 h-12 transition-all duration-700 ${
            activeTab === "history" ? "bg-black text-white border-black" : "bg-transparent text-white border-white hover:bg-white hover:text-black"
          }`}
        >
          History
        </button>

        <button
          onClick={() => setActiveTab(activeTab === "profile" ? null : "profile")}
          className={`px-10 py-2 border-2 font-bold rounded-lg mt-5 w-56 h-12 transition-all duration-700 ${
            activeTab === "profile" ? "bg-black text-white border-black" : "bg-transparent text-white border-white hover:bg-white hover:text-black"
          }`}
        >
          Profile Setting
        </button>

        <button
          onClick={() => setActiveTab(activeTab === "reset" ? null : "reset")}
          className={`px-10 py-2 border-2 font-bold rounded-lg mt-5 w-56 h-12 transition-all duration-700 ${
            activeTab === "reset" ? "bg-black text-white border-black" : "bg-transparent text-white border-white hover:bg-white hover:text-black"
          }`}
        >
          Reset Password
        </button>


        <button
          onClick={() => setActiveTab(activeTab === "delete" ? null : "delete")}
          className="px-10 py-2 border-2 border-red-500 text-red-500 font-bold rounded-lg mt-5 bg-transparent w-56 h-12 hover:bg-red-500 hover:text-white transition-all duration-500"
        >
          Delete ID
        </button>

        {activeTab && (
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 border-2 border-white rounded-lg backdrop-blur-lg text-white flex flex-col gap-4 bg-gray-900 shadow-xl" style={{ width: "500px" }}>
            {activeTab === "history" ? (
              <span className="text-center text-lg font-semibold">Your History</span>
            ) : activeTab === "reset" ? (
              <>
                <h2 className="text-xl font-semibold text-center">Reset Password</h2>
                <label>New Password</label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="p-2 bg-gray-700 rounded-md text-white w-full" />
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="p-2 bg-gray-700 rounded-md text-white w-full" />
              </>
            ) : activeTab === "delete" ? (
              <>
                <h2 className="text-xl font-semibold text-center text-red-500">Delete Account</h2>
                <p className="text-center text-lg">Press confirm button to delete</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-center">Profile Setting</h2>
                <label>Change Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="p-2 bg-gray-700 rounded-md text-white w-full" />
                <label>Change Firstname</label>
                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="p-2 bg-gray-700 rounded-md text-white w-full" />
                <label>Change Lastname</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="p-2 bg-gray-700 rounded-md text-white w-full" />
                <label>Birthday</label>
                  <div className="flex justify-between">
                    <input
                      type="number"
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                      placeholder="DD"
                      pattern="[0-9]*"
                      maxLength={2}
                      min="1"
                      max="31"
                      className="p-2 bg-gray-700 rounded-md text-white w-16 text-center"
                    />
                    <span>/</span>
                    <input
                      type="number"
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      placeholder="MM"
                      pattern="[0-9]*"
                      maxLength={2}
                      min="1"
                      max="12"
                      className="p-2 bg-gray-700 rounded-md text-white w-16 text-center"
                    />
                    <span>/</span>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="YYYY"
                      pattern="[0-9]*"
                      maxLength={4}
                      min="1900"
                      max="2100"
                      className="p-2 bg-gray-700 rounded-md text-white w-24 text-center"
                    />
                  </div>

              </>
              
            )}

            <button
              className={`px-10 py-2 border-2 font-bold rounded-lg mt-5 w-full transition-all duration-500 ${
                activeTab === "delete"
                  ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              }`}
            >
              Confirm
            </button>

            <button onClick={() => setActiveTab(null)} className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 transition-all duration-500">
              Close
            </button>
          </div>
        )}

        <Link href="/login">
          <button className="px-10 py-2 border-2 border-red-500 text-red-500 font-bold rounded-lg mt-5 bg-transparent w-56 h-12 hover:bg-red-500 hover:text-white transition-all duration-500">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}
