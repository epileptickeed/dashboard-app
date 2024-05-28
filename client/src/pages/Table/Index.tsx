import "./table.scss";
import { tableContent } from "../../../data/tableContent";
import { useState } from "react";
import axios from "axios";
import Demo from "./demo-table/Demo";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../redux/userDataSlice/selector";
import toast from "react-hot-toast";

const Index = () => {
  const { expenses } = useSelector(userDataSelector);

  const [type, setType] = useState("qwe");
  const [desc, setDesc] = useState("qwe");
  const [sum, setSum] = useState(5005);
  const [category, setCategory] = useState("qwe");

  const handleSubmit = async () => {
    const postData = {
      type: type,
      desc: desc,
      sum: sum,
      category: category,
    };

    try {
      const response = await axios.post(`/expenses`, postData);
      toast.success("You`ve added a activity, please refresh");
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(`Something went wrong :(`);
    }
  };

  return (
    <div className="table_page">
      {/* <Demo /> */}
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
    </div>
  );
};

export default Index;
