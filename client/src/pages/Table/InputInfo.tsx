import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInputSelector } from '../../redux/userInputSlice/selector';
import { IoClose } from 'react-icons/io5';
import {
  setDesc,
  setOpen,
  setSelectedCategory,
  setSelectedType,
  setSum,
} from '../../redux/userInputSlice/slice';
import axios from 'axios';
import toast from 'react-hot-toast';

const InputInfo = () => {
  const dispatch = useDispatch();
  const { type, category, sum, desc, selectedCategory, selectedType } =
    useSelector(userInputSelector);

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length > 9) {
      target.value = target.value.slice(0, 9);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    const date = new Date();
    const localDate = date.toLocaleString();
    const postData = {
      type: selectedType,
      desc: desc,
      sum: sum,
      category: selectedCategory,
      id: crypto.randomUUID(),
      date: localDate,
    };

    try {
      if (selectedCategory === '' || selectedType === '' || sum === 0 || desc === '') {
        toast.error('Please enter all inputs');
        e.preventDefault();
        return false;
      } else {
        toast.success('Expense added successfully');
        e.preventDefault();
        dispatch(setOpen(false));
        await axios.post(`/expenses`, postData);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        return false; // <-- чтобы в url не добавлялись type + category
      }
    } catch (error) {
      console.error(error);
      toast.error(`Something went wrong :(`);
      e.preventDefault();
    }
  };

  const closePopup = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setOpen(false));
  };

  return (
    <div className="inputForm">
      <form action="">
        <button className="closeBtn" onClick={(e) => closePopup(e)}>
          <IoClose size={25} />
        </button>
        <div>
          <label htmlFor="type-select">Тип:</label>
          <select
            name="type"
            id="type-select"
            onChange={(e) => dispatch(setSelectedType(e.target.value))}>
            <option value="">--Выберите тип--</option>
            {type.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label htmlFor="category-select">Категория:</label>
          <select
            name="category"
            id="category-select"
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}>
            <option value="">--Выберите категорию--</option>
            {selectedType === 'Доходы'
              ? category
                  .filter((item) => item === 'Стипендия' || item === 'Зарплата')
                  .map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })
              : category
                  .filter((item) => item !== 'Стипендия' && item !== 'Зарплата')
                  .map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
          </select>
        </div>

        <div>
          <label htmlFor="desc">Описание:</label>
          <input
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => dispatch(setDesc(e.target.value))}
            maxLength={15}
          />
        </div>

        <div>
          <label htmlFor="sum">Сумма:</label>
          <input
            type="number"
            id="sum"
            value={sum}
            onChange={(e) => dispatch(setSum(e.target.value))}
            onInput={(e) => onInput(e)}
          />
        </div>
        <button onClick={(e) => handleSubmit(e)}>Добавить</button>
      </form>
    </div>
  );
};

export default InputInfo;
