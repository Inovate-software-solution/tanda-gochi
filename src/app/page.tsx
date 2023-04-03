"use client";

import React from "react";
import { useState, useEffect } from "react";
import logo from "../../public/images/TandaLogo.png";
import Image from "next/image";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [idText, setIdText] = useState("");

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    });
  }, []);

  return (
    <main className="min-h-screen bg-bg_main bg-center bg-no-repeat flex justify-center items-center">
      <div className="w-[500px] h-[800px] backdrop-blur-sm bg-gray-800/90 rounded-3xl">
        <div className="flex justify-center">
          <div className="w-[300px] mt-10">
            <Image src={logo} alt="" />
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <label className="text-white font-bold text-[60px]">
            {currentTime}
          </label>
        </div>
        <div className="flex justify-center m-4 text-[24px] px-6">
          <input className="w-full p-2 border-2 border-black" readOnly />
        </div>

        <div>
          <div className="grid grid-cols-3 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: any) => (
              <div key={index} className="m-2">
                <div className="flex justify-center">
                  <button className="bg-white w-[70px] h-[70px] text-[30px] rounded-full hover:bg-slate-400">
                    {index}
                  </button>
                </div>
              </div>
            ))}
            <div></div>
            <div className="col-span-1 flex justify-center">
              <button className="bg-white w-[70px] h-[70px] text-[30px] rounded-full m-2">
                0
              </button>
            </div>

            <div className="flex justify-center">
              <button className="bg-white w-[70px] h-[70px] text-[30px] rounded-full m-2"></button>
            </div>
          </div>
        </div>

        <div className="m-4 flex justify-center">
          <button className="bg-blue-400 text-[30px] px-8 rounded-full text-white">
            CLOCK
          </button>
        </div>
      </div>
    </main>
  );
}
