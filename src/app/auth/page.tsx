"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";
import TandaLogo from "@/components/General/TandaLogo";
import LiveTime from "@/components/General/LiveTime";

export default function AuthLayout() {
  const router = useRouter();
  const appUsername = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    if (appUsername != null) {
      router.push("/info");
    }
  }, [appUsername]);

  return (
    <div className="min-h-screen bg-bg_main bg-center bg-no-repeat flex justify-center sm:items-center min-w-full sm:min-w-0">
      <div className="min-h-screen w-full p-10 sm:min-h-0 rounded-none sm:w-[400px] backdrop-blur-sm sm:rounded-3xl sm:items-start items-center justify-center bg-teritary-10/90">
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
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
