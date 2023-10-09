"use client";

import React, { useState, useEffect } from "react";
import Success from "@/public/images/check-green.gif";
import Failed from "@/public/images/error-img.gif";
import TandaLogo from "@/components/General/TandaLogo";
import LiveTime from "@/components/General/LiveTime";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [idText, setIdText] = useState("");

  const [clocking, setClocking] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Use for triggering reload on gif
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const DeviceToken = localStorage.getItem("DeviceToken");
    if (!DeviceToken) {
      router.push("/auth");
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
      setFailed(false);
      setClocking(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [clocking]);

  function DisplaySuccess() {
    setClocking(false);
    setSuccess(true);
    setFailed(false);
    setIdText("");
  }

  function DisplayFailed() {
    setClocking(false);
    setSuccess(false);
    setFailed(true);
    setIdText("");
  }

  function DisplayReset() {
    setClocking(true);
    setSuccess(false);
    setFailed(false);
    setIdText("");
  }

  async function ClockIn() {
    await fetch(process.env.BACKEND_API + "/clocking/clockin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DeviceToken: localStorage.getItem("DeviceToken"),
        Passcode: idText,
        GameResult: "win",
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
  }

  return (
    <div className="min-h-screen bg-bg_main bg-center bg-no-repeat flex justify-center sm:items-center min-w-full sm:min-w-0">
      <div
        className={
          clocking
            ? "min-h-screen w-full sm:min-h-0 rounded-none sm:w-[400px] sm:h-[650px] backdrop-blur-sm sm:rounded-3xl sm:items-start items-center flex justify-center bg-tertiary-10/95"
            : "min-h-screen w-full sm:min-h-0 rounded-none sm:w-[400px] sm:h-[650px] backdrop-blur-sm sm:rounded-3xl sm:items-start items-center flex justify-center bg-white"
        }
      >
        {/* Input section */}
        {clocking ? (
          <div className="">
            <div className="flex justify-center mt-10">
              <TandaLogo className="w-[120px] sm:w-[180px]" />
            </div>

            <div className="mt-4">
              <LiveTime labelClassName="text-white font-bold text-[24px]" />
            </div>

            <div className="flex justify-center m-4 text-[16px] sm:text-[24px] mt-2 px-6">
              <div className="grid grid-cols-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="col-span-1 flex justify-center">
                    <input
                      className="p-1 m-2 w-[50px] h-[50px] border-2 border-black text-center font-bold text-white text-[42px]"
                      readOnly
                      value={idText.split("")[index] || ""}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-6">
              <div className="grid grid-cols-3 w-full font-bold">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                  <div key={index} className="m-1 sm:m-1">
                    <div className="flex justify-center">
                      <button
                        className="bg-white text-blue-400 w-full sm:w-[70px] sm:h-[70px] text-[35px] sm:rounded-full hover:bg-slate-400"
                        onClick={() => {
                          if (idText.length < 4) {
                            setIdText(idText + index);
                          }
                        }}
                      >
                        {index}
                      </button>
                    </div>
                  </div>
                ))}
                <div></div>
                <div className="col-span-1 flex justify-center">
                  <button
                    className="bg-white text-blue-400 w-full sm:w-[70px] sm:h-[70px] text-[35px] sm:rounded-full m-1 sm:m-1 hover:bg-slate-400"
                    onClick={() => {
                      if (idText.length < 4) {
                        setIdText(idText + 0);
                      }
                    }}
                  >
                    0
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    className="bg-white w-full text-blue-400 sm:w-[70px] sm:h-[70px] text-[20px] sm:rounded-full m-1 sm:m-1 hover:bg-slate-400"
                    onClick={() => setIdText("")}
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            </div>

            <div className="m-4 flex justify-center">
              <button
                className="bg-tertiary-60 hover:bg-tertiary-40 text-[30px] px-8 rounded-full text-white"
                onClick={async () => {
                  const response = await ClockIn();
                  console.log(response);
                  if (!response.error) {
                    DisplaySuccess();
                    setReloadKey((prevKey) => prevKey + 1); // Use functional form
                  } else {
                    setErrorMessage(response.message);
                    DisplayFailed();
                    setReloadKey((prevKey) => prevKey + 1); // Use functional form
                  }
                }}
              >
                CLOCK
              </button>
            </div>
          </div>
        ) : null}

        {/* Appear on success */}
        {success ? (
          <div className="h-full">
            {/* Add the reloadKey as the key attribute */}
            <div className="w-[200px] h-[200px] mt-28">
              <img src={Success.src} alt="Success tick" key={reloadKey} />
            </div>

            <div className="flex justify-center font-bold text-green-600 text-[30px]">
              Success!
            </div>

            <div className="flex justify-center">
              <button
                className="bg-tertiary-60 hover:bg-tertiary-40 text-[30px] px-8 rounded-full text-white mt-[120px]"
                onClick={() => {
                  DisplayReset();
                  setReloadKey(reloadKey + 1); // Increment the reloadKey
                }}
              >
                BACK
              </button>
            </div>
          </div>
        ) : null}

        {/* Appear on failed */}
        {failed ? (
          <div className="h-full">
            {/* Add the reloadKey as the key attribute */}
            <div className="mt-16">
              <img src={Failed.src} alt="Failed tick" key={reloadKey} />
            </div>

            <div className="flex justify-center font-bold text-red-600 text-[30px]">
              Invalid Passcode
            </div>

            <div className="flex justify-center">
              <button
                className="bg-tertiary-60 hover:bg-tertiary-40 text-[30px] px-8 rounded-full text-white mt-[120px]"
                onClick={() => {
                  DisplayReset();
                  setReloadKey(reloadKey + 1); // Increment the reloadKey
                }}
              >
                BACK
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
