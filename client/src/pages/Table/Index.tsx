import './table.scss';
import { tableContent } from '../../../data/tableContent';
import { useState } from 'react';
import axios from 'axios';
import DemoTable from './demo-table/DemoTable';

const Index = () => {
  const [type, setType] = useState('qwe');
  const [desc, setDesc] = useState('qwe');
  const [sum, setSum] = useState(5005);
  const [category, setCategory] = useState('qwe');

  const handleSubmit = async () => {
    const postData = {
      type: type,
      desc: desc,
      sum: sum,
      category: category,
    };

    await axios.post(`http://localhost:4000/expenses`, postData);
  };

  return (
    <div className="table_page">
      <DemoTable />
      <div className="table_header">
        <h1>Таблица</h1>
        <button onClick={() => handleSubmit()}>Добавить</button>
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
          {tableContent.map((item, index) => {
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
          })}
        </table>
      </div>
    </div>
  );
};

export default Index;
