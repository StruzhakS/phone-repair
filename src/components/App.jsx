import { useEffect } from 'react';
import React from 'react';
import Phone from './Phones/Phone';
import { useDispatch, useSelector } from 'react-redux';
import { getallPhonesOperation } from 'Strore/Phones/Operations';
import AddPhoneModal from './AddPhoneModal/AddPhoneModal';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPhones = async () => {
      dispatch(getallPhonesOperation());
    };
    getAllPhones();
  }, [dispatch]);

  const phones = useSelector(state => state.phone.phones);

  return (
    <>
      <ul>
        {phones &&
          phones.map((el, i) => {
            return <Phone el={el} i={i} />;
          })}
      </ul>
      <AddPhoneModal />
    </>
  );
};
