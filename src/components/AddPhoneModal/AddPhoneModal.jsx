import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addPhoneOperation } from 'Strore/Phones/Operations';
import { validatePhone } from '../../utils/phones';
import s from './AddPhoneModal.module.css';

Modal.setAppElement('#root');

const AddPhoneModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    Model: '',
    Price: '',
    Detailprice: '',
    Sold_for: '',
    Note: '',
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setErrors({});
    setFormData({
      Model: '',
      Price: '',
      Detailprice: '',
      Sold_for: '',
      Note: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validatePhone(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(addPhoneOperation({ ...formData, Model: formData.Model.trim() }));
    closeModal();
  };

  return (
    <>
      <button onClick={openModal} className={s.openButton}>
        ➕ Додати телефон
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={s.modal}
        overlayClassName={s.overlay}
      >
        <div className={s.modalContent}>
          <div className={s.modalHeader}>
            <h2>📱 Додати новий телефон</h2>
            <button
              className={s.closeButton}
              onClick={closeModal}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className={s.form} noValidate>
            <div className={s.formGroup}>
              <label htmlFor="Model">Модель телефону *</label>
              <input
                id="Model"
                type="text"
                name="Model"
                placeholder="Наприклад: iPhone 14 Pro"
                value={formData.Model}
                onChange={handleInputChange}
                className={s.input}
                required
              />
              {errors.Model && <p className={s.error}>{errors.Model}</p>}
            </div>

            <div className={s.twoColumns}>
              <div className={s.formGroup}>
                <label htmlFor="Price">Вартість телефону (₴) *</label>
                <input
                  id="Price"
                  type="number"
                  name="Price"
                  placeholder="5000"
                  min="0"
                  value={formData.Price}
                  onChange={handleInputChange}
                  className={s.input}
                  required
                />
                {errors.Price && <p className={s.error}>{errors.Price}</p>}
              </div>

              <div className={s.formGroup}>
                <label htmlFor="Detailprice">Вартість запчастин (₴) *</label>
                <input
                  id="Detailprice"
                  type="number"
                  name="Detailprice"
                  placeholder="500"
                  min="0"
                  value={formData.Detailprice}
                  onChange={handleInputChange}
                  className={s.input}
                  required
                />
                {errors.Detailprice && <p className={s.error}>{errors.Detailprice}</p>}
              </div>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="Sold_for">Ціна продажу (₴) *</label>
              <input
                id="Sold_for"
                type="number"
                name="Sold_for"
                placeholder="7000"
                min="0"
                value={formData.Sold_for}
                onChange={handleInputChange}
                className={s.input}
                required
              />
              {errors.Sold_for && <p className={s.error}>{errors.Sold_for}</p>}
            </div>

            <div className={s.formGroup}>
              <label htmlFor="Note">Примітка</label>
              <textarea
                id="Note"
                name="Note"
                placeholder="Додаткова інформація про телефон..."
                value={formData.Note}
                onChange={handleInputChange}
                className={s.textarea}
                rows="3"
              />
            </div>

            <div className={s.buttonGroup}>
              <button type="button" onClick={closeModal} className={s.cancelButton}>
                Скасувати
              </button>
              <button type="submit" className={s.submitButton}>
                Додати телефон
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddPhoneModal;
