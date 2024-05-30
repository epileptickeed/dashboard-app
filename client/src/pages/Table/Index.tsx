import './table.scss';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userDataSelector } from '../../redux/userDataSlice/selector';
import { setCurrentUser, setExpenses } from '../../redux/userDataSlice/slice';
import InputInfo from './InputInfo';
import { userInputSelector } from '../../redux/userInputSlice/selector';
import { setOpen } from '../../redux/userInputSlice/slice';
import TableMain from './TableMain/Table';

const Index = () => {
  const { expenses } = useSelector(userDataSelector);
  const { open } = useSelector(userInputSelector);

  const dispatch = useDispatch();
  const { currentUser } = useSelector(userDataSelector);
  useEffect(() => {
    if (!currentUser) {
      axios.get('/profile').then(({ data }) => {
        dispatch(setCurrentUser(data));
      });
    }
    dispatch(setExpenses(currentUser?.expenses));
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="table_page">
      <div className="table_header">
        <h1>Таблица</h1>
        <button onClick={() => dispatch(setOpen(true))}>Добавить</button>
      </div>
      <div className="table_content">
        <TableMain expenses={expenses} />
      </div>

      <div className={open ? '' : 'notActive'}>
        <InputInfo />
      </div>
    </div>
  );
};

export default Index;
