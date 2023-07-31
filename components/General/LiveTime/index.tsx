"use client";

import React from "react";
import { useState, useEffect } from "react";

interface Props {
  labelClassName: string;
  containerClassName?: string | "flex justify-center item-center";
  showDate?: boolean | true;
}

export default function LiveTime({
  labelClassName,
  containerClassName = "flex justify-center item-center",
  showDate = true,
}: Props) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    });
  }, []);

  return (
    <div>
      {showDate ? (
        <div className={containerClassName}>
          <label className={labelClassName}>{currentDate}</label>
        </div>
      ) : null}

      <div className={containerClassName}>
        <label className={labelClassName}>{currentTime}</label>
      </div>
    </div>
  );
}
