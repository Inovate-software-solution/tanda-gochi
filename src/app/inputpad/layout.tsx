"use client";

import Sidebar from "@/components/Info/Sidebar";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function InfoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const appUsername = useSelector((state: RootState) => state.user.username);
  const [isLoading, setIsLoading] = useState(true);
  
  return <Sidebar>{children}</Sidebar>;
}
