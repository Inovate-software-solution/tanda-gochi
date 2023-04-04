"use client";

import React from "react";
import { useState, useEffect } from "react";
import logo from "../../public/images/TandaLogo.png";
import Image from "next/image";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [idText, setIdText] = useState("");

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    });
  }, []);

  return (
    <main className="min-h-screen bg-bg_main bg-center bg-no-repeat flex justify-center sm:items-center ">
      <div className="w-full h-full rounded-none sm:w-[500px] sm:h-[800px] backdrop-blur-sm bg-gray-800/90 sm:rounded-3xl">
        <div className="flex justify-center">
          <div className="w-[120px] sm:w-[250px] mt-10">
            <Image src={logo} alt="" priority />
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <label className="text-white font-bold text-[24px] sm:text-[48px]">
            {currentTime}
          </label>
        </div>
        <div className="flex justify-center">
          <label className="text-white font-bold text-[24px] sm:text-[48px]">
            {currentDate}
          </label>
        </div>

        <div className="flex justify-center m-4 text-[16px] sm:text-[24px] mt-2 px-6">
          <input
            className="w-full p-2 border-2 border-black"
            readOnly
            value={idText}
          />
        </div>

        <div>
          <div className="grid grid-cols-3 w-full font-bold">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: any) => (
              <div key={index} className="m-1 sm:m-2">
                <div className="flex justify-center">
                  <button
                    className="bg-white w-full sm:w-[80px] sm:h-[80px] text-[35px] sm:rounded-full hover:bg-slate-400"
                    onClick={() => setIdText(idText + index)}
                  >
                    {index}
                  </button>
                </div>
              </div>
            ))}
            <div></div>
            <div className="col-span-1 flex justify-center">
              <button
                className="bg-white w-full sm:w-[80px] sm:h-[80px] text-[35px] sm:rounded-full m-1 sm:m-2 hover:bg-slate-400"
                onClick={() => setIdText(idText + "0")}
              >
                0
              </button>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-white w-full sm:w-[80px] sm:h-[80px] text-[30px] sm:rounded-full m-1 sm:m-2 hover:bg-slate-400"
                onClick={() => setIdText("")}
              >
                Clear
              </button>
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
