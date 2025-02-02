import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ macros }) => {
  if (!macros || !macros.data) return null;

  const totalMacros = macros.data.find(item => item["Food Item"] === "Total");
  const total = totalMacros.Carbs + totalMacros.Protein + totalMacros.Fats;

  const data = {
    labels: ["Carbs", "Protein", "Fats"],
    datasets: [
      {
        data: [totalMacros.Carbs, totalMacros.Protein, totalMacros.Fats],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14, weight: "bold" },
        },
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 14 },
        formatter: (value, ctx) => {
          let percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}% (${value}g)`;
        },
      },
    },
  };

  return (
    <div className="text-center mt-4 mb-5">
      <h3 className="font1 text-secondary">Macronutrient Breakdown</h3>
      <div className="pie-container">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
