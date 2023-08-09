import Modal from 'react-modal';
import { CiEdit } from 'react-icons/ci';
import {
  deletePhoneOperation,
  updatePhoneModelOperation,
} from 'Strore/Phones/Operations';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from '../Phones/Phone.module.css';

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
  const [changeName, setChangeName] = useState('');
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deletePhoneOperation(id));
  };

  const changedField = { id, Model: changeName };

  const handleChanged = () => {
    dispatch(updatePhoneModelOperation(changedField));
    setIsOpen(false);
    setChangeName('');
  };

  return (
    <>
      <div>
        <button onClick={() => setIsOpen(true)} className={s.changeButton}>
          {CiEdit()}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Змінити ім"я</h2>
          <input
            type="text"
            name="changeName"
            value={changeName}
            onChange={e => setChangeName(e.target.value)}
          />
          <button onClick={handleChanged}>Змінити</button>

          <button onClick={() => setIsOpen(false)}>close</button>
        </Modal>
      </div>
      <button onClick={handleClick}>Delete phone</button>
    </>
  );
};

export default Button;
