import { useEffect, useState } from 'react';
import React from 'react';
import Phone from './Phones/Phone';
import { useDispatch, useSelector } from 'react-redux';
import { getallPhonesOperation } from 'Strore/Phones/Operations';
import AddPhoneModal from './AddPhoneModal/AddPhoneModal';
import { filterPhones, filterPhonesById } from 'Strore/Phones/PhonesSlice';
import s from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.phone.filter);
  const phones = useSelector(state => state.phone.phones);
  const filterById = useSelector(state => state.phone.filterById);

  useEffect(() => {
    const getAllPhones = async () => {
      dispatch(getallPhonesOperation());
    };
    getAllPhones();
  }, [dispatch]);

  const visiblePhones = phones?.filter(el => {
    if (filter === 'sold') {
      return el.isSold === true;
    }
    if (filter === 'not_sold') {
      return el.isSold === false;
    }
    return el;
  });

  const caphones = visiblePhones.filter(el => el.id.includes(filterById));

  const [filteredPhone, setFilterById] = useState('');

  const filterPhonesByIdFunction = ({ target: { value } }) => {
    setFilterById(value);
    dispatch(filterPhonesById(value));
  };

  return (
    <>
      <div className={s.topWrapper}>
        <AddPhoneModal />
        <select
          name="priority"
          onChange={e => dispatch(filterPhones(e.target.value))}
          value={filter}
          className={s.filterSelect}
        >
          <option value="all">Всі</option>
          <option value="sold">Продані</option>
          <option value="not_sold">Не продані</option>
        </select>
        <input
          type="text"
          placeholder="Пошук по номеру"
          onChange={filterPhonesByIdFunction}
          value={filteredPhone}
        />
      </div>
      <ul className={s.phoneList}>
        {caphones &&
          caphones.map((el, i) => {
            const proffit = el?.Sold_for - el?.Price - el?.Detailprice;
            return <Phone el={el} i={i} proffit={proffit} />;
          })}
      </ul>
    </>
  );
};
