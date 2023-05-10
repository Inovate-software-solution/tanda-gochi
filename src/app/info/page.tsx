"use client";

import React from "react";
import { useState, useEffect } from "react";

import Header from "../../../components/Header";
import TopCards from "../../../components/TopCards";
import BarChart from "../../../components/BarChart";
import BarChart2 from "../../../components/BarChart 2";
import RecentOrders from "../../../components/leaderboard";

export default function page() {
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
