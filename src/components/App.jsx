import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallPhonesOperation } from 'Strore/Phones/Operations';
import { filterPhones, filterPhonesById } from 'Strore/Phones/PhonesSlice';
import AddPhoneModal from './AddPhoneModal/AddPhoneModal';
import PhonesList from './PhonesList/PhonesList';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';
import LoginModal from './LoginModal/LoginModal';
import { PERIODS, getPeriodRange, isInRange, getAddedDate, getSoldDate } from '../utils/phones';
import { exportPhonesToExcel } from '../utils/exportExcel';
import s from './App.module.css';

const AUTH_KEY = 'phone-repair-auth';

export const App = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const filter = useSelector(state => state.phone.filter);
  const phones = useSelector(state => state.phone.phones);
  const filterById = useSelector(state => state.phone.filterById);
  const loading = useSelector(state => state.phone.loading);
  const error = useSelector(state => state.phone.error);
  const [period, setPeriod] = useState('all');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const range = getPeriodRange(period, customFrom, customTo);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    if (isAuth) {
      dispatch(getallPhonesOperation());
    }
  }, [dispatch, isAuth]);

  const handleLogin = () => {
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch {}
    setIsAuth(true);
  };

  // Filter by status
  const visiblePhones = phones?.filter(el => {
    if (range && !isInRange(getAddedDate(el), range) && !isInRange(getSoldDate(el), range)) {
      return false;
    }
    if (filter === 'sold') {
      return el.isSold === true;
    }
    if (filter === 'not_sold') {
      return el.isSold === false;
    }
    return el;
  });

  // Filter by ID
  const filteredPhones = visiblePhones.filter(el => 
    el.id.toString().includes(filterById) || 
    (el.Model && el.Model.toLowerCase().includes(filterById.toLowerCase()))
  );

  // Sort phones
  const sortedPhones = [...(filteredPhones || [])].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return Number(a.Price) - Number(b.Price);
      case 'price-desc':
        return Number(b.Price) - Number(a.Price);
      case 'profit-asc':
        return (a.Sold_for - a.Price - a.Detailprice) - (b.Sold_for - b.Price - b.Detailprice);
      case 'profit-desc':
        return (b.Sold_for - b.Price - b.Detailprice) - (a.Sold_for - a.Price - a.Detailprice);
      case 'date':
      default:
        return b.id - a.id;
    }
  });

  const handleFilterChange = (e) => {
    dispatch(filterPhones(e.target.value));
  };

  const handleSearchChange = ({ target: { value } }) => {
    setSearchValue(value);
    dispatch(filterPhonesById(value));
  };

  if (!isAuth) {
    return <LoginModal onSuccess={handleLogin} />;
  }

  return (
    <div className={s.app}>
      <Header />
      
      <main className={s.mainContent}>
        <div className={s.container}>
          {/* Dashboard Analytics */}
          <Dashboard phones={phones} range={range} />

          {/* Controls Section */}
          <div className={s.controlsSection}>
            <div className={s.periodRow}>
              <select
                value={period}
                onChange={e => setPeriod(e.target.value)}
                className={s.select}
              >
                {PERIODS.map(p => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              {period === 'custom' && (
                <>
                  <label className={s.dateLabel}>
                    Від
                    <input
                      type="date"
                      value={customFrom}
                      max={customTo || undefined}
                      onChange={e => setCustomFrom(e.target.value)}
                      className={s.searchInput}
                    />
                  </label>
                  <label className={s.dateLabel}>
                    До
                    <input
                      type="date"
                      value={customTo}
                      min={customFrom || undefined}
                      onChange={e => setCustomTo(e.target.value)}
                      className={s.searchInput}
                    />
                  </label>
                </>
              )}
            </div>

            <div className={s.controlsWrapper}>
              <div className={s.filterGroup}>
                <select
                  name="filter"
                  onChange={handleFilterChange}
                  value={filter}
                  className={s.select}
                >
                  <option value="all">📱 Всі телефони</option>
                  <option value="sold">✅ Продані</option>
                  <option value="not_sold">🔄 Не продані</option>
                </select>

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className={s.select}
                >
                  <option value="date">📅 За датою</option>
                  <option value="price-asc">💰 Ціна (зростання)</option>
                  <option value="price-desc">💰 Ціна (спадання)</option>
                  <option value="profit-asc">📈 Прибуток (мін)</option>
                  <option value="profit-desc">📈 Прибуток (макс)</option>
                </select>
              </div>

              <input
                className={s.searchInput}
                type="text"
                placeholder="🔍 Пошук по ID або моделі..."
                onChange={handleSearchChange}
                value={searchValue}
              />

              <AddPhoneModal />
              <button
                type="button"
                className={s.exportButton}
                onClick={() => exportPhonesToExcel(phones)}
                disabled={!phones || phones.length === 0}
                title="Зберегти всі телефони в Excel (бекап)"
              >
                📥 Експорт в Excel
              </button>
            </div>
          </div>

          {/* Phones List */}
          {error && (
            <div className={s.errorBanner}>
              ⚠️ Не вдалося завантажити дані: {String(error)}{' '}
              <button className={s.retryButton} onClick={() => dispatch(getallPhonesOperation())}>
                Спробувати ще раз
              </button>
            </div>
          )}

          {loading && phones.length === 0 ? (
            <div className={s.loader}>
              <div className={s.spinner} />
              <p>Завантаження...</p>
            </div>
          ) : (
            <PhonesList phones={sortedPhones} />
          )}
        </div>
      </main>
    </div>
  );
};
