"use client";

import Sidebar from "../../../components/Sidebar";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function InfoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

 /*  const router = useRouter();
  const appUsername = useSelector((state: RootState) => state.user.username);
  useEffect(()=>{
    if (appUsername==null){
        router.push("/auth");
    }
  }) */
  return <Sidebar>{children}</Sidebar>;
}
