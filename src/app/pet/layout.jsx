"use client";

import "./globals.css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Info/Sidebar";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("loading");

  useEffect(() => {
    if (
      !sessionStorage.getItem("jwt") ||
      sessionStorage.getItem("jwt") === ""
    ) {
      setContent("redirectToAuth");
      // } else if (appUsername === "admin") {
      //   setContent("sidebar");
    } else if (sessionStorage.getItem("jwt")) {
      setContent("sidebar");
    } else {
      setContent("accessDenied");
    }
  }, []);

  if (content === "loading") {
    return <div>Loading...</div>;
  }

  if (content === "redirectToAuth") {
    router.push("/auth");
    return null;
  }

  if (content === "sidebar") {
    return <Sidebar>{children}</Sidebar>;
  }

  return <div>Access Denied</div>;
}
