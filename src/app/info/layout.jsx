"use client";

import Sidebar from "../../../components/Info/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InfoLayout({
  children, // will be a page or nested layout
}) {
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

  // if (isLoading) {
  //   return <div>Loading...</div>; // Or your loading component
  // } else {
  //   return <Sidebar>{children}</Sidebar>;
  // }
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
