"use client";

import React, { useState } from "react";
import Header from "../../../components/Info/Header";
import TopCards from "../../../components/Info/TopCards";
import BarChart from "../../../components/Info/BarChart";
import BarChart2 from "../../../components/Info/BarChart2";
import RecentOrders from "../../../components/Info/leaderboard";
import LatePrediction from "../../../components/Info/LatePrediction";

export default function Page() {
  const [chartType, setChartType] = useState("BarChart");

  const toggleChart = () => {
    setChartType((prevChartType) =>
      prevChartType === "BarChart" ? "BarChart2" : "BarChart"
    );
  };

  const handleChartClick = () => {
    if (chartType === "BarChart2") {
      setChartType("BarChart");
    } else {
      setChartType("BarChart2");
    }
  };

  return (
    <div>
      <main className="bg-gray-100 min-h-screen">
        <Header title={""} />
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          {chartType === "BarChart" ? (
            <BarChart onClick={handleChartClick} />
          ) : (
            <BarChart2 onClick={handleChartClick} />
          )}
          <RecentOrders />
          <LatePrediction />
        </div>
      </main>
    </div>
  );
}
