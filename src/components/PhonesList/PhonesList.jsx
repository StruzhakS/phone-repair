import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePhoneOperation, updatePhoneStatusOperation } from 'Strore/Phones/Operations';
import EditPhoneModal from '../EditPhoneModal/EditPhoneModal';
import { getAddedDate, getSoldDate, getDaysToSell } from '../../utils/phones';
import s from './PhonesList.module.css';

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const PAGE_SIZE_KEY = 'phone-repair-page-size';

const getInitialPageSize = () => {
  try {
    const saved = Number(localStorage.getItem(PAGE_SIZE_KEY));
    return PAGE_SIZE_OPTIONS.includes(saved) ? saved : PAGE_SIZE_OPTIONS[0];
  } catch {
    return PAGE_SIZE_OPTIONS[0];
  }
};

const formatDate = value => {
  if (!value) return '—';
  const date = new Date(value);
  return isNaN(date) ? '—' : date.toLocaleDateString('uk-UA');
};

const PhonesList = ({ phones = [] }) => {
  const dispatch = useDispatch();
  const [editingPhone, setEditingPhone] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getInitialPageSize);

  const handlePageSizeChange = e => {
    const size = Number(e.target.value);
    setPageSize(size);
    setPage(1);
    try {
      localStorage.setItem(PAGE_SIZE_KEY, String(size));
    } catch {}
  };

  const totalPages = Math.max(1, Math.ceil((phones?.length || 0) / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagePhones = (phones || []).slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = (id) => {
    if (window.confirm('Ви впевнені що хочете видалити цей телефон?')) {
      dispatch(deletePhoneOperation(id));
    }
  };

  const handleStatusToggle = (id, currentStatus) => {
    dispatch(updatePhoneStatusOperation({ id, check: currentStatus }));
  };

  if (!phones || phones.length === 0) {
    return (
      <div className={s.emptyState}>
        <p className={s.emptyIcon}>📱</p>
        <p className={s.emptyText}>Немає телефонів для відображення</p>
        <p className={s.emptySubtext}>Додайте свій перший телефон щоб почати</p>
      </div>
    );
  }

  return (
    <>
      <div className={s.listContainer}>
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Модель</th>
                <th>Ціна телефону</th>
                <th>Ціна запчастин</th>
                <th>Ціна продажу</th>
                <th>Прибуток</th>
                <th>Додано</th>
                <th>Продано</th>
                <th>Днів до продажу</th>
                <th>Статус</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {pagePhones.map((phone) => {
                const profit = Number(phone.Sold_for) - Number(phone.Price) - Number(phone.Detailprice);
                const isProfitable = profit >= 0;
                const statusClass = phone.isSold ? s.sold : s.notSold;
                const profitClass = isProfitable ? s.profitPositive : s.profitNegative;

                return (
                  <tr key={phone.id} className={s.tableRow}>
                    <td className={s.idCell}>{phone.id}</td>
                    <td className={s.modelCell}>
                      <div className={s.modelInfo}>
                        <span className={s.modelName}>{phone.Model}</span>
                        {phone.Note && (
                          <span className={s.note} title={phone.Note}>📝</span>
                        )}
                      </div>
                    </td>
                    <td>{Number(phone.Price).toLocaleString('uk-UA')} ₴</td>
                    <td>{Number(phone.Detailprice).toLocaleString('uk-UA')} ₴</td>
                    <td>{Number(phone.Sold_for).toLocaleString('uk-UA')} ₴</td>
                    <td className={profitClass}>
                      <strong>
                        {isProfitable ? '+' : ''}{profit.toLocaleString('uk-UA')} ₴
                      </strong>
                    </td>
                    <td>{formatDate(getAddedDate(phone))}</td>
                    <td>{formatDate(getSoldDate(phone))}</td>
                    <td>{getDaysToSell(phone) ?? '—'}</td>
                    <td>
                      <button
                        className={`${s.statusBadge} ${statusClass}`}
                        onClick={() => handleStatusToggle(phone.id, phone.isSold)}
                        title="Натисніть щоб змінити статус"
                      >
                        {phone.isSold ? '✅ Продано' : '🔄 Не продано'}
                      </button>
                    </td>
                    <td className={s.actionsCell}>
                      <button
                        className={s.editButton}
                        onClick={() => setEditingPhone(phone)}
                        title="Редагувати"
                      >
                        ✏️
                      </button>
                      <button
                        className={s.deleteButton}
                        onClick={() => handleDelete(phone.id)}
                        title="Видалити"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={s.pagination}>
        <label className={s.pageSize}>
          Показувати по
          <select value={pageSize} onChange={handlePageSizeChange} className={s.pageSizeSelect}>
            {PAGE_SIZE_OPTIONS.map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        {totalPages > 1 && (
          <>
            <button
              className={s.pageButton}
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Назад
            </button>
            <span className={s.pageInfo}>
              Сторінка {currentPage} з {totalPages}
            </span>
            <button
              className={s.pageButton}
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Далі →
            </button>
          </>
        )}
      </div>

      {editingPhone && (
        <EditPhoneModal
          phone={editingPhone}
          onClose={() => setEditingPhone(null)}
        />
      )}

      <div className={s.summary}>
        <p>📊 Всього телефонів: <strong>{phones.length}</strong></p>
        <p>✅ Продано: <strong>{phones.filter(p => p.isSold).length}</strong></p>
        <p>🔄 Непродано: <strong>{phones.filter(p => !p.isSold).length}</strong></p>
      </div>
    </>
  );
};

export default PhonesList;
