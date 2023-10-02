"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";
import TandaLogo from "@/components/General/TandaLogo";
import LiveTime from "@/components/General/LiveTime";

export default function AuthLayout() {
  const router = useRouter();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);

  return (
    <div className="min-h-screen bg-bg_main bg-center bg-no-repeat flex justify-center sm:items-center min-w-full sm:min-w-0">
      <div className="min-h-screen w-full p-10 sm:min-h-0 rounded-none sm:w-[400px] backdrop-blur-sm sm:rounded-3xl sm:items-start items-center justify-center bg-tertiary-10/95">
        <div className="flex justify-center">
          <div className=" my-4">
            <TandaLogo className="w-[120px] sm:w-[180px]" />
          </div>
        </div>
        <div className="flex justify-center">
          <LiveTime labelClassName="text-white font-bold sm:text-[24px] text-[16px]" />
        </div>
        <div className="flex justify-center">
          <div className="m-4">
            {/* Login form */}

            <div className="">
              <form>
                <div>
                  {/* Email section */}
                  <div>
                    <label className="text-primary-100 font-bold">Email:</label>
                    <br />
                    <input
                      className="w-full p-1 border-1 border-black"
                      type="text"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loggingIn || registering}
                    />
                  </div>
                  {/* Password section */}
                  {loggingIn ? (
                    <div>
                      <br />
                      <label className="text-primary-100 font-bold">
                        Password:
                      </label>
                      <br />
                      <input
                        className="w-full p-1 border-1 border-black"
                        type="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  ) : null}

                  {registering ? (
                    <div>
                      <br />
                      <label className="text-primary-100 font-bold">
                        Password:
                      </label>
                      <br />
                      <input
                        className="w-full p-1 border-1 border-black"
                        type="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <br />
                      <label className="text-primary-100 font-bold">
                        Confirm Password:
                      </label>
                      <br />
                      <input
                        className="w-full p-1 border-1 border-black"
                        type="password"
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  ) : null}
                  <br />
                </div>
              </form>

              {isError ? (
                <div className="font-bold text-red-500">
                  {"Error: " + errorMessage}
                </div>
              ) : null}

              {/* Check the user Email if it is valid */}
              {!registering ? (
                <div className="flex justify-center mt-10">
                  {loggingIn ? (
                    <button
                      className="bg-tertiary-60 hover:bg-tertiary-40 p-1 px-4 rounded text-lg font-bold text-tertiary-100 mx-4"
                      onClick={() => {
                        setLoggingIn(true);
                      }}
                    >
                      Back
                    </button>
                  ) : null}
                  {loggingIn ? (
                    <button
                      className="bg-tertiary-60 hover:bg-tertiary-40 p-1 px-4 rounded text-lg font-bold text-tertiary-100 mx-4"
                      onClick={() => {
                        fetch(process.env.BACKEND_API + "/users/login", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            Email: Email,
                            Password: Password,
                          }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            if (!data.error) {
                              sessionStorage.setItem("jwt", data.token);
                              sessionStorage.setItem("Scopes", data.Scopes);
                              return router.push("/info");
                            }

                            setIsError(true);
                            setErrorMessage("Invalid Password");
                          });
                      }}
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      className="bg-tertiary-60 hover:bg-tertiary-40 p-1 px-4 rounded text-lg font-bold text-tertiary-100 mx-4"
                      onClick={() =>
                        fetch(process.env.BACKEND_API + "/users/checkuser", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ Email: Email }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            if (!data.error) {
                              setLoggingIn(true);
                              setErrorMessage("");
                              setIsError(false);
                              return;
                            }
                            if (
                              data.error &&
                              data.message ===
                                "User is valid and exist in Tanda DB but not registered"
                            ) {
                              setRegistering(true);
                              setErrorMessage("");
                              setIsError(false);
                              return;
                            }
                            setIsError(true);
                            setErrorMessage("Invalid Email");
                          })
                      }
                    >
                      Next
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex justify-center mt-10">
                  <button
                    className="bg-tertiary-60 hover:bg-tertiary-40 p-1 px-4 rounded text-lg font-bold text-tertiary-100 mx-4"
                    onClick={() => {
                      setRegistering(false);
                      setPassword("");
                      setConfirmPassword("");
                    }}
                  >
                    Back
                  </button>

                  <button
                    className="bg-tertiary-60 hover:bg-tertiary-40 p-1 px-4 rounded text-lg font-bold text-tertiary-100 mx-4"
                    onClick={() => {
                      if (Password !== ConfirmPassword) {
                        setIsError(true);
                        setErrorMessage("Password does not match");
                        return;
                      }

                      if (Password.length < 8) {
                        setIsError(true);
                        setErrorMessage("Password must be 8 characters long");
                        return;
                      }

                      fetch(process.env.BACKEND_API + "/users/register", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          Email: Email,
                          Password: Password,
                        }),
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (!data.error) {
                            setRegistering(false);
                            setPassword("");
                            setConfirmPassword("");
                            setLoggingIn(true);
                            setErrorMessage("");
                            setIsError(false);
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
