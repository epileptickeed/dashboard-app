import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const Graph = ({ chartData }: any) => {
  return (
    <div className="graph_page">
      <Pie data={chartData} />
    </div>
  );
};

export default Graph;
