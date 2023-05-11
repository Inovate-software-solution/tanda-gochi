'use client';

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function AuthLayout() {
  const router = useRouter();
  const appUsername = useSelector((state: RootState) => state.user.username);
  useEffect(()=>{
    if (appUsername!=null){
        router.push("/info");
    }
},[appUsername])
  return (<LoginForm/>)
}