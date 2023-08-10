import React, { useState } from 'react';
import s from './Phone.module.css';
import Modal from 'react-modal';
import Button from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import { updateStatusPhoneOperation } from 'Strore/Phones/Operations';
import { AiOutlineClose } from 'react-icons/ai';
import { PiNotePencil } from 'react-icons/pi';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const Phone = ({ el, i, proffit }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [check, setChecked] = useState(false);

  const dispatch = useDispatch();

  const handleChecked = async () => {
    setChecked(prev => !prev);
    dispatch(updateStatusPhoneOperation({ id: el.id, check }));
  };

  return (
    <li
      className={s.phoneItem}
      style={
        el.isSold
          ? { backgroundColor: 'rgb(124, 246, 124)' }
          : { backgroundColor: 'rgb(255, 249, 88)' }
      }
      key={i}
    >
      <p>Продано</p>
      <input type="checkbox" checked={el.isSold} onChange={handleChecked} />
      <h2 className={s.modelTitle}>Модель: {el?.Model}</h2>
      <p>Взяв телефон за: {el?.Price || 0}</p>
      <p>Ціна запчастин: {el?.Detailprice}</p>
      <p> {el.Sold_for > 0 ? `Продано за: ${el.Sold_for}` : 'Не продано'}</p>
      <p className={proffit > 0 ? s.positiveProffit : s.negativeProffit}>
        Прибуток: {proffit}
      </p>
      <div>
        <Button id={el.id} note={el?.Note} />
        <button onClick={() => setIsOpen(true)}>{PiNotePencil()}</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Примітка до {el?.Model}</h2>
          <p>{el?.Note}</p>
          <button
            onClick={() => setIsOpen(false)}
            className={s.closeChangeModal}
          >
            {AiOutlineClose()}
          </button>
        </Modal>
      </div>
    </li>
  );
};

export default Phone;
