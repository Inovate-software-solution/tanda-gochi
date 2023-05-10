"use client";

import Sidebar from "../../../components/Sidebar";

export default function InfoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
