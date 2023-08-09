import React, { useState } from 'react';
import Modal from 'react-modal';
import s from './AddPhoneModal.module.css';
import { useDispatch } from 'react-redux';
import { addPhoneOperation } from 'Strore/Phones/Operations';
Modal.setAppElement('#root');
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
const AddPhoneModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    model: '',
    price: '',
    detailPrice: '',
    note: '',
  });
  const handleAdd = async () => {
    const phone = {
      Model: form.model,
      Price: form.price,
      Detailprice: form.detailPrice,
      Proffit:
        form.Sold_for > 0 ? form.Sold_for - (form.price + form.detailPrice) : 0,
      Note: form.note,
      Sold_for: 0,
    };
    dispatch(addPhoneOperation(phone));
    setIsOpen(false);
    formReset();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => {
      return { ...prevForm, [name]: value };
    });
  };

  const formReset = () => {
    setForm({
      model: '',
      price: '',
      detailPrice: '',
      note: '',
    });
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add phone</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Добавити телефон</h2>
        <button onClick={() => setIsOpen(false)}>close</button>
        <form className={s.form}>
          <input
            onChange={handleChange}
            type="text"
            name="model"
            placeholder="Введи модель телефону"
            value={form.model}
          />
          <input
            onChange={handleChange}
            type="number"
            name="price"
            placeholder="Введи ціну телефону"
            value={form.price}
          />
          <input
            onChange={handleChange}
            type="number"
            name="detailPrice"
            placeholder="Введи витрати на деталі"
            value={form.detailPrice}
          />
          <input
            onChange={handleChange}
            type="text"
            name="note"
            placeholder="Введіть примітку"
            value={form.note}
          />
        </form>
        <button type="submit" onClick={handleAdd}>
          Add Phone
        </button>
      </Modal>
    </>
  );
};

export default AddPhoneModal;
