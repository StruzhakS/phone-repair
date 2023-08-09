import React from 'react';
import s from './Phone.module.css';
import Modal from 'react-modal';
import Button from 'components/Button/Button';
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
const Phone = ({ el, i }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <li className={s.phoneItem} key={i}>
      <h2 className={s.modelTitle}>Модель: {el?.Model}</h2>
      <p>Ціна телефону: {el?.Price}</p>
      <p>Ціна запчастин: {el?.Detailprice}</p>
      <p className={el?.Proffit > 0 ? s.positiveProffit : s.negativeProffit}>
        Прибуток: {el.Sold_for === 0 ? 'Не продано' : el?.Proffit}
      </p>
      <p>Продано за: {el.Sold_for === 0 ? 'Не продано' : el.Sold_for}</p>
      <Button id={el?.id} note={el?.Note} />
      <div>
        <button onClick={() => setIsOpen(true)}>Примітки</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Примітка до {el?.Model}</h2>
          <p>{el?.Note}</p>
          <button onClick={() => setIsOpen(false)}>close</button>
        </Modal>
      </div>
    </li>
  );
};

export default Phone;
