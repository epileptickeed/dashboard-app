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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDataSelector } from '../../redux/userDataSlice/selector';
import axios from 'axios';
import { setCurrentUser, setExpenses } from '../../redux/userDataSlice/slice';
import { RootState } from '../../redux/store';
import { setGraphExpense, setGraphIncome, setToggleGraph } from '../../redux/graphDataSlice/slice';
import { defaultGraph } from './data/DefautlGraph';

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
  const { graphExpense, graphIncome, toggleGraph } = useSelector(
    (state: RootState) => state.graphData,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      axios.get('/profile').then(({ data }) => {
        dispatch(setCurrentUser(data));
      });
    }
    dispatch(setExpenses(currentUser?.expenses));
  }, [currentUser]);

  // ужасссс...
  useEffect(() => {
    const filteredExpenses = expenses?.filter((item) => item.type === 'Расходы');
    dispatch(
      setGraphExpense({
        labels: filteredExpenses ? filteredExpenses!.map((item) => item.category) : [],
        datasets: [
          {
            label: 'Расходы',
            data: filteredExpenses ? filteredExpenses!.map((item) => item.sum) : [],
            backgroundColor: ['green', 'blue', 'red', 'purple', 'yellow'],
          },
        ],
      }),
    );
    const filteredIncome = expenses?.filter((item) => item.type === 'Доходы');
    dispatch(
      setGraphIncome({
        labels: filteredIncome ? filteredIncome!.map((item) => item.category) : [],
        datasets: [
          {
            label: 'Доходы',
            data: filteredIncome ? filteredIncome!.map((item) => item.sum) : [],
            backgroundColor: ['green', 'blue', 'red', 'purple', 'yellow'],
          },
        ],
      }),
    );
  }, [expenses]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="graph_page">
      <div className={toggleGraph ? 'notActive' : 'graph_expense'}>
        {graphExpense === undefined ? (
          <Pie data={defaultGraph} />
        ) : (
          <Pie data={graphExpense} options={options} />
        )}
      </div>
      <div className={toggleGraph ? 'graph_income' : 'notActive'}>
        {graphIncome === undefined ? (
          <Pie data={defaultGraph} />
        ) : (
          <Pie data={graphIncome} options={options} />
        )}
      </div>
      <button onClick={() => dispatch(setToggleGraph(!toggleGraph))}>
        {toggleGraph ? 'Расходы' : 'Доходы'}
      </button>
    </div>
  );
};

export default Graph;
