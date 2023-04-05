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
    <main className="min-h-screen bg-bg_main bg-center bg-no-repeat flex justify-center sm:items-center min-w-full sm:min-w-0">
      <div className="min-h-screen w-full sm:min-h-0 rounded-none sm:w-[400px] sm:h-[650px] backdrop-blur-sm bg-gray-800/90 sm:rounded-3xl sm:items-start items-center flex justify-center">
        <div className="">
          <div className="flex justify-center">
            <div className="w-[120px] sm:w-[180px] mt-10">
              <Image src={logo} alt="" priority />
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <label className="text-white font-bold text-[24px]">
              {currentTime}
            </label>
          </div>
          <div className="flex justify-center">
            <label className="text-white font-bold text-[24px]">
              {currentDate}
            </label>
          </div>

          <div className="flex justify-center m-4 text-[16px] sm:text-[24px] mt-2 px-6">
            <input
              className="w-full p-1 border-2 border-black"
              readOnly
              value={idText}
            />
          </div>

          <div className="mx-6">
            <div className="grid grid-cols-3 w-full font-bold">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: any) => (
                <div key={index} className="m-1 sm:m-1">
                  <div className="flex justify-center">
                    <button
                      className="bg-white w-full sm:w-[70px] sm:h-[70px] text-[35px] sm:rounded-full hover:bg-slate-400"
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
                  className="bg-white w-full sm:w-[70px] sm:h-[70px] text-[35px] sm:rounded-full m-1 sm:m-1 hover:bg-slate-400"
                  onClick={() => setIdText(idText + "0")}
                >
                  0
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-white w-full sm:w-[70px] sm:h-[70px] text-[30px] sm:rounded-full m-1 sm:m-1 hover:bg-slate-400"
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
      </div>
    </main>
  );
}
