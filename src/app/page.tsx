"use client";

import React from "react";
import { useState, useEffect } from "react";
import logo from "../../public/images/TandaLogo.png";
import Image from "next/image";
import Success from "../../public/images/check-green.gif";
import Failed from "../../public/images/error-img.gif";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [idText, setIdText] = useState("");

  const [clocking, setClocking] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
      setFailed(false);
      setClocking(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [clocking]);

  return (
    <div className="min-h-screen bg-bg_main bg-center bg-no-repeat flex justify-center sm:items-center min-w-full sm:min-w-0">
      <div
        className={
          clocking
            ? "min-h-screen w-full sm:min-h-0 rounded-none sm:w-[400px] sm:h-[650px] backdrop-blur-sm sm:rounded-3xl sm:items-start items-center flex justify-center bg-gray-800/90"
            : "min-h-screen w-full sm:min-h-0 rounded-none sm:w-[400px] sm:h-[650px] backdrop-blur-sm sm:rounded-3xl sm:items-start items-center flex justify-center bg-white"
        }
      >
        {clocking ? (
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
              <button
                className="bg-blue-400 text-[30px] px-8 rounded-full text-white"
                onClick={() => {
                  if (idText === "123456") {
                    setClocking(false);
                    setSuccess(true);
                    setFailed(false);
                    setIdText("");
                  } else {
                    setClocking(false);
                    setSuccess(false);
                    setFailed(true);
                    setIdText("");
                  }
                }}
              >
                CLOCK
              </button>
            </div>
          </div>
        ) : null}

        {success ? (
          <div className="h-full">
            <div className="w-[200px] h-[200px] mt-28">
              <img src={Success.src} alt="Success tick" />
            </div>
            <div
              className={`flex justify-center font-bold text-[30px] mt-8 transition-opacity duration-500 ${
                success ? "opacity-100" : "opacity-0"
              }`}
            >
              <label>Good morning</label>
            </div>

            <div className="m-4 flex justify-center mt-20">
              <button
                className="bg-blue-400 text-[30px] px-8 rounded-full text-white"
                onClick={() => {
                  setClocking(true);
                  setSuccess(false);
                }}
              >
                Back
              </button>
            </div>
          </div>
        ) : null}

        {failed ? (
          <div className="h-full">
            <div className=" mt-16">
              <img src={Failed.src} alt="Success tick" />
            </div>
            <div
              className={`flex justify-center font-bold text-[30px] mt-8 transition-opacity duration-500 ${
                failed ? "opacity-100" : "opacity-0"
              }`}
            >
              <label>Invalid ID number</label>
            </div>

            <div className="m-4 flex justify-center mt-20">
              <button
                className="bg-blue-400 text-[30px] px-8 rounded-full text-white"
                onClick={() => {
                  setClocking(true);
                  setSuccess(false);
                  setFailed(false);
                }}
              >
                Back
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div></div>
    </div>
  );
}
