import React, { useState } from 'react';
import Modal from 'react-modal';
import s from './LoginModal.module.css';

Modal.setAppElement('#root');

const LOGIN = 'RusikBrat';
const PASSWORD = '300593';

const LoginModal = ({ onSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (login.trim() === LOGIN && password === PASSWORD) {
      onSuccess();
    } else {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <Modal
      isOpen
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      className={s.modal}
      overlayClassName={s.overlay}
      contentLabel="Вхід"
    >
      <form className={s.form} onSubmit={handleSubmit}>
        <h2 className={s.title}>🔐 Вхід</h2>
        <input
          className={s.input}
          type="text"
          placeholder="Логін"
          autoComplete="username"
          autoFocus
          value={login}
          onChange={e => {
            setLogin(e.target.value);
            setError('');
          }}
        />
        <input
          className={s.input}
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setError('');
          }}
        />
        {error && <p className={s.error}>{error}</p>}
        <button className={s.submitButton} type="submit">
          Увійти
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
