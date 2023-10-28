"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout() {
  const router = useRouter();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [DeviceName, setDeviceName] = useState("");

  return (
    <div className="min-h-screen bg-bg_main bg-center bg-no-repeat flex justify-center sm:items-center min-w-full sm:min-w-0">
      <div className="min-h-screen w-full p-10 sm:min-h-0 rounded-none sm:w-[400px] backdrop-blur-sm sm:rounded-3xl sm:items-start items-center justify-center bg-tertiary-10/95">
        <div className="font-bold text-white flex justify-center text-[24px]">
          Register this device
        </div>
        <div className="flex justify-center">
          <div className="m-4">
            {/* Login form */}
            <form>
              <div>
                {/* Email section */}

                <label className="text-primary-100 font-bold">
                  Admin Email:
                </label>
                <br />
                <input
                  className="w-full p-1 border-1 border-black"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password section */}

                <br />
                <label className="text-primary-100 font-bold">
                  Admin Password:
                </label>
                <br />
                <input
                  className="w-full p-1 border-1 border-black"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <label className="text-primary-100 font-bold">
                  Device Name:
                </label>
                <br />
                <input
                  className="w-full p-1 border-1 border-black"
                  type="text"
                  onChange={(e) => setDeviceName(e.target.value)}
                />

                <br />
                {isError ? (
                  <div className="font-bold text-red-600">
                    Error: {errorMessage}
                  </div>
                ) : null}
              </div>
            </form>

            <div className=" m-4 flex justify-center">
              <button
                className="bg-tertiary-60 hover:bg-tertiary-40 p-1 px-4 rounded text-lg font-bold text-tertiary-100"
                onClick={() => {
                  fetch(process.env.BACKEND_API + "/devices/register", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      DeviceName: DeviceName,
                      Email: Email,
                      Password: Password,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (!data.error) {
                        localStorage.setItem("DeviceToken", data.DeviceToken);
                        router.push("/");
                        return;
                      }

                      setIsError(true);
                      setErrorMessage(data.message);
                    });
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
