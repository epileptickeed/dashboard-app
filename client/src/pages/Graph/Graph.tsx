import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Graph = ({ chartData }: any) => {
  return (
    <div className="graph_page">
      <Pie data={chartData} />
    </div>
  );
};

export default Graph;
