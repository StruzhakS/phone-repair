import Modal from 'react-modal';
import { CiEdit } from 'react-icons/ci';
import {
  deletePhoneOperation,
  updatePhoneModelOperation,
} from 'Strore/Phones/Operations';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from '../Phones/Phone.module.css';
import { getPhoneByIdApi } from 'PhonesApi';
import st from '../AddPhoneModal/AddPhoneModal.module.css';
import sty from './Button.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';

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

const Button = ({ id }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (!window.confirm('Ти реально хочеш видалити телефон ???')) {
      return;
    }
    dispatch(deletePhoneOperation(id));
  };
  const [phone, setPhone] = useState('');

  const changedField = { id, phone };

  const handleUpdatePhone = () => {
    dispatch(updatePhoneModelOperation(changedField));
    setIsOpen(false);
  };

  const handleChangeField = async () => {
    const phoneTOUpdate = await getPhoneByIdApi(id);
    setPhone(phoneTOUpdate);
    setIsOpen(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setPhone(prevPhone => {
      return { ...prevPhone, [name]: value };
    });
  };

  return (
    <>
      <div>
        <button onClick={handleChangeField} className={sty.changeButton}>
          {CiEdit()}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
          className={s.changeModal}
        >
          <h2>Змінити параметри</h2>
          <form className={st.form}>
            <label htmlFor="Model">Модель телефону</label>
            <input
              onChange={handleChange}
              type="text"
              name="Model"
              placeholder="Введи модель телефону"
              value={phone.Model}
            />
            <label htmlFor="Price">Ціна телефону</label>
            <input
              onChange={handleChange}
              type="number"
              name="Price"
              placeholder="Введи ціну телефону"
              value={phone.Price}
            />
            <label htmlFor="Detailprice">Витрати на деталі</label>
            <input
              onChange={handleChange}
              type="number"
              name="Detailprice"
              placeholder="Введи витрати на деталі"
              value={phone.Detailprice}
            />
            <label htmlFor="Sold_for">Продано за</label>
            <input
              onChange={handleChange}
              type="number"
              name="Sold_for"
              placeholder="Продано за"
              value={phone.Sold_for}
            />
            <label htmlFor="Note">Примітка</label>
            <input
              onChange={handleChange}
              type="text"
              name="Note"
              placeholder="Введіть примітку"
              value={phone.Note}
            />
          </form>
          <button onClick={handleUpdatePhone}>Змінити</button>

          <button
            onClick={() => setIsOpen(false)}
            className={sty.closeChangeModal}
          >
            {AiOutlineClose()}
          </button>
        </Modal>
      </div>
      <button onClick={handleClick} className={s.changeButton}>
        {MdOutlineDeleteOutline()}
      </button>
    </>
  );
};

export default Button;
