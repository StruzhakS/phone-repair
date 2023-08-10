import { useEffect } from 'react';
import React from 'react';
import Phone from './Phones/Phone';
import { useDispatch, useSelector } from 'react-redux';
import { getallPhonesOperation } from 'Strore/Phones/Operations';
import AddPhoneModal from './AddPhoneModal/AddPhoneModal';
import { filterPhones } from 'Strore/Phones/PhonesSlice';
import s from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.phone.filter);
  const phones = useSelector(state => state.phone.phones);

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

  return (
    <>
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
      <AddPhoneModal />
      <ul className={s.phoneList}>
        {visiblePhones &&
          visiblePhones.map((el, i) => {
            const proffit = el?.Sold_for - el?.Price - el?.Detailprice;
            return <Phone el={el} i={i} proffit={proffit} />;
          })}
      </ul>
    </>
  );
};
