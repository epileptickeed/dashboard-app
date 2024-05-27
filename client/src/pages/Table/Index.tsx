import './table.scss';
import { tableContent } from '../../../data/tableContent';

const Index = () => {
  return (
    <div className="table_page">
      <div className="table_header">
        <h1>Таблица</h1>
        <button>Добавить</button>
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
