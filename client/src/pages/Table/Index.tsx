import './table.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userDataSelector } from '../../redux/userDataSlice/selector';
import { setCurrentUser, setExpenses } from '../../redux/userDataSlice/slice';
import InputInfo from './InputInfo';

const Index = () => {
  const { expenses } = useSelector(userDataSelector);

  const [open, setOpen] = useState(false);

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
      {/* <Demo /> */}
      <div className="table_header">
        <h1>Таблица</h1>
        <button onClick={() => setOpen(true)}>Добавить</button>
      </div>
      <div className="table_content">
        <table className="iksweb">
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>Тип</td>
              <td>Категория</td>
              <td>Описание</td>
              <td>Сумма</td>
            </tr>
          </tbody>
          {expenses
            ? expenses.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{item.type}</td>
                      <td>{item.category}</td>
                      <td>{item?.desc}</td>
                      <td>{item.sum}</td>
                    </tr>
                  </tbody>
                );
              })
            : null}
        </table>
      </div>
      <div className={open ? '' : 'notActive'}>
        <InputInfo />
      </div>
    </div>
  );
};

export default Index;
