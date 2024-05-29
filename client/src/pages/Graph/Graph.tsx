import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../redux/userDataSlice/selector';
Chart.register(ArcElement);

const Graph = () => {
  const { expenses } = useSelector(userDataSelector);
  const [data, setData] = useState({
    labels: expenses ? expenses!.map((item) => item.category) : [],
    datasets: [
      {
        label: 'Users Gained',
        data: expenses ? expenses!.map((item) => item.sum) : [],
        backgroundColor: ['green', 'blue', 'red', 'purple', 'yellow'],
      },
    ],
  });

  return (
    <div className="graph_page">
      <Pie data={data} />
    </div>
  );
};

export default Graph;
