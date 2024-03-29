import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ onClick }) => {
  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "min",
        data: [0, 30, 10, 60, 0, 0, 50],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235, 0.4)",
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "rest time",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  });

  useEffect(() => {
    setChartData({
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "min",
          data: [0, 30, 10, 60, 0, 0, 50],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4)",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "rest time",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <div
        className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white"
        onClick={handleClick}
      >
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
