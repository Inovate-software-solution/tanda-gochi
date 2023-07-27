"use client";

import { useState, useEffect } from "react";

import Header from "@/components/Info/Header";
import TopCards from "@/components/Info/TopCards";
import BarChart from "@/components/Info/BarChart";
import BarChart2 from "@/components/Info/BarChart 2";
import RecentOrders from "@/components/Info/leaderboard";

export default function Home() {
  const [chartType, setChartType] = useState("BarChart");

  const toggleChart = () => {
    setChartType(chartType === "BarChart" ? "BarChart2" : "BarChart");
  };

  return (
    <div>
      <main className="bg-gray-100 min-h-screen">
        <Header title={""} />
        <TopCards />
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          {chartType === "BarChart" ? <BarChart /> : <BarChart2 />}
          <RecentOrders />
        </div>
        <button onClick={toggleChart}>next chart</button>
      </main>
    </div>
  );
}
