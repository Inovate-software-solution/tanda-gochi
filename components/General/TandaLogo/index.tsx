import React from "react";
import Image from "next/image";
import logo from "@/public/images/TandaLogo.png";

interface Props {
  className: string;
}

export default function index(props: Props) {
  return (
    <div className={props.className}>
      <Image src={logo} alt="This should be a Tanda Logo " priority />
    </div>
  );
}
