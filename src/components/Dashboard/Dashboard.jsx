import React from 'react';
import { getAddedDate, getSoldDate, getDaysToSell, isInRange } from '../../utils/phones';
import s from './Dashboard.module.css';

const MONTHS = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];

const phoneProfit = el =>
  Number(el?.Sold_for || 0) - Number(el?.Price || 0) - Number(el?.Detailprice || 0);

const getMonthlyProfit = phones => {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth(), label: MONTHS[d.getMonth()], profit: 0 });
  }
  phones.forEach(el => {
    const sold = getSoldDate(el);
    if (!sold) return;
    const bucket = months.find(m => m.year === sold.getFullYear() && m.month === sold.getMonth());
    if (bucket) bucket.profit += phoneProfit(el);
  });
  return months;
};

const Dashboard = ({ phones = [], range = null }) => {
  const addedPhones = phones.filter(el => isInRange(getAddedDate(el), range));
  const totalPricePhones = addedPhones.reduce((acc, el) => acc + Number(el?.Price || 0), 0);
  const totalPriceDetails = addedPhones.reduce((acc, el) => acc + Number(el?.Detailprice || 0), 0);
  const totalSpent = totalPricePhones + totalPriceDetails;

  const soldPhones = phones.filter(el => el.isSold && (!range || isInRange(getSoldDate(el), range)));
  const totalSoldValue = soldPhones.reduce((acc, el) => acc + Number(el?.Sold_for || 0), 0);
  const soldSpent = soldPhones.reduce(
    (acc, el) => acc + Number(el?.Price || 0) + Number(el?.Detailprice || 0),
    0
  );

  const netProfit = totalSoldValue - soldSpent;

  const possibleProfit = addedPhones.filter(el => !el.isSold).reduce((acc, el) => acc + phoneProfit(el), 0);

  const daysList = soldPhones.map(getDaysToSell).filter(d => d !== null);
  const avgDays = daysList.length
    ? Math.round(daysList.reduce((a, b) => a + b, 0) / daysList.length)
    : null;

  const monthly = getMonthlyProfit(phones);
  const maxAbs = Math.max(1, ...monthly.map(m => Math.abs(m.profit)));

  const stats = [
    {
      label: 'Вартість телефонів',
      value: totalPricePhones,
      icon: '📱',
      color: 'blue',
    },
    {
      label: 'Вартість запчастин',
      value: totalPriceDetails,
      icon: '🔧',
      color: 'orange',
    },
    {
      label: 'Всього інвестовано',
      value: totalSpent,
      icon: '💸',
      color: 'red',
    },
    {
      label: 'Продано на',
      value: totalSoldValue,
      icon: '💰',
      color: 'green',
    },
    {
      label: 'Чистий прибуток',
      value: netProfit,
      icon: '📈',
      color: netProfit >= 0 ? 'success' : 'danger',
    },
    {
      label: 'Можливий прибуток',
      value: possibleProfit,
      icon: '🎯',
      color: 'purple',
    },
    {
      label: 'Середній термін продажу',
      value: avgDays === null ? '—' : avgDays,
      unit: avgDays === null ? '' : 'дн.',
      icon: '⏱️',
      color: 'blue',
    },
  ];

  return (
    <div className={s.dashboard}>
      <h2 className={s.title}>📊 Аналітика та статистика</h2>
      <div className={s.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} className={`${s.statCard} ${s[stat.color]}`}>
            <div className={s.statHeader}>
              <span className={s.icon}>{stat.icon}</span>
              <p className={s.label}>{stat.label}</p>
            </div>
            <div className={s.value}>
              {typeof stat.value === 'number'
                ? stat.value.toLocaleString('uk-UA')
                : stat.value}{' '}
              {stat.unit !== undefined ? stat.unit : '₴'}
            </div>
          </div>
        ))}
      </div>

      <div className={s.chartCard}>
        <h3 className={s.chartTitle}>📈 Прибуток по місяцях (останні 6)</h3>
        <div className={s.chart}>
          {monthly.map(m => (
            <div key={`${m.year}-${m.month}`} className={s.chartCol}>
              <span className={s.chartValue}>{m.profit.toLocaleString('uk-UA')}</span>
              <div className={s.chartBarWrap}>
                <div
                  className={`${s.chartBar} ${m.profit < 0 ? s.chartBarNeg : ''}`}
                  style={{ height: `${(Math.abs(m.profit) / maxAbs) * 100}%` }}
                />
              </div>
              <span className={s.chartLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
