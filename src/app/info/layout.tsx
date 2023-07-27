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

  useEffect(() => {
    // if (appUsername == null) {
    //   router.push("/auth");
    // }
    // } else {
    //   setIsLoading(false);
    // }
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>; // Or your loading component
  // } else {
  //   return <Sidebar>{children}</Sidebar>;
  // }
  return <Sidebar>{children}</Sidebar>;
}
