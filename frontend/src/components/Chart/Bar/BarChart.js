import Chart, { CategoryScale } from "chart.js/auto";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const BarChart = ({ chartData, chartLabels }) => {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Poll result",
        data: chartData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Question",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return <Bar data={data} options={chartOptions} />;
};

export default BarChart;
