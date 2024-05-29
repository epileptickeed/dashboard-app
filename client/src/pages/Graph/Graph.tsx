import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDataSelector } from '../../redux/userDataSlice/selector';
import axios from 'axios';
import { setCurrentUser, setExpenses } from '../../redux/userDataSlice/slice';
import { RootState } from '../../redux/store';
import { setGraphExpense } from '../../redux/graphDataSlice/slice';
// import { setGraphData } from '../../redux/graphDataSlice/slice';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Graph = () => {
  const { currentUser, expenses } = useSelector(userDataSelector);
  const { graphExpense, graphIncome } = useSelector((state: RootState) => state.graphData);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    labels: expenses ? expenses!.map((item) => item.category) : [],
    datasets: [
      {
        label: 'Расходы',
        data: expenses ? expenses!.map((item) => item.sum) : [],
        backgroundColor: ['green', 'blue', 'red', 'purple', 'yellow'],
      },
    ],
  });

  useEffect(() => {
    if (!currentUser) {
      axios.get('/profile').then(({ data }) => {
        dispatch(setCurrentUser(data));
      });
    }
    dispatch(setExpenses(currentUser?.expenses));
    console.log(expenses.map((item) => item.category));
    if (expenses) {
      dispatch(setGraphExpense(expenses));
    }
    console.log(graphExpense);

    //причина этой безобразии в том что если юзер находиться на странице /graph то график сам не рендериться
    //фиксанётся если зайти в /table и обратно
    //из-за этого пришлось дважды писать это :((
    setData({
      labels: expenses ? expenses!.map((item) => item.category) : [],
      datasets: [
        {
          label: 'Расходы',
          data: expenses ? expenses!.map((item) => item.sum) : [],
          backgroundColor: ['green', 'blue', 'red', 'purple', 'yellow'],
        },
      ],
    });
  }, [currentUser]);

  // console.log(currentUser);

  return (
    <div className="graph_page">
      <Pie data={data} />
    </div>
  );
};

export default Graph;
