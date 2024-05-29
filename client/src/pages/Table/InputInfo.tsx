import React, { FormEvent } from 'react';
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

  //будь ты проклят тайпскрипт
  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length > 4) {
      target.value = target.value.slice(0, 9);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    const postData = {
      type: selectedType,
      desc: desc,
      sum: sum,
      category: selectedCategory,
    };

    try {
      if (selectedCategory === '' || selectedType === '' || sum === 0 || desc === '') {
        toast.error('Please enter all input');
        e.preventDefault();
        return false;
      } else {
        await axios.post(`/expenses`, postData);
      }
    } catch (error) {
      console.error(error);
      e.preventDefault();
      toast.error(`Something went wrong :(`);
    }
  };

  return (
    <div className="inputForm">
      <form action="">
        <button className="closeBtn" onClick={() => dispatch(setOpen(false))}>
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
            {category.map((item, index) => {
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
