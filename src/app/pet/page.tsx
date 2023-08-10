import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function page() {
  const appUsername = useSelector((state: RootState) => state.user.username);
  const router = useRouter();
  if (appUsername == "user") {
    return <div className="">page</div>;
  }
  else {
    router.push("/auth");
  }
  
}
