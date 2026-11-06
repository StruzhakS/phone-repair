import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updatePhoneOperation } from 'Strore/Phones/Operations';
import { validatePhone } from '../../utils/phones';
import s from './EditPhoneModal.module.css';

const EditPhoneModal = ({ phone, onClose }) => {
  const [formData, setFormData] = useState({
    Model: phone.Model,
    Price: phone.Price,
    Detailprice: phone.Detailprice,
    Sold_for: phone.Sold_for,
    Note: phone.Note,
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

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

    dispatch(
      updatePhoneOperation({
        id: phone.id,
        phone: { ...formData, Model: String(formData.Model).trim() },
      })
    );
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <div className={s.modalContent}>
        <div className={s.modalHeader}>
          <h2>✏️ Редагувати телефон #{phone.id}</h2>
          <button
            className={s.closeButton}
            onClick={onClose}
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
              value={formData.Note}
              onChange={handleInputChange}
              className={s.textarea}
              rows="3"
            />
          </div>

          <div className={s.buttonGroup}>
            <button type="button" onClick={onClose} className={s.cancelButton}>
              Скасувати
            </button>
            <button type="submit" className={s.submitButton}>
              Зберегти зміни
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPhoneModal;
