const DAY_MS = 24 * 60 * 60 * 1000;

const toDate = value => {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date) ? null : date;
};

export const getAddedDate = phone => toDate(phone?.addedAt || phone?.createdAt);

export const getSoldDate = phone => (phone?.isSold ? toDate(phone?.soldAt) : null);

export const getDaysToSell = phone => {
  const added = getAddedDate(phone);
  const sold = getSoldDate(phone);
  if (!added || !sold) return null;
  return Math.max(0, Math.round((sold - added) / DAY_MS));
};

export const PERIODS = [
  { value: 'all', label: '🗓️ Весь час' },
  { value: '7d', label: 'Останні 7 днів' },
  { value: '30d', label: 'Останні 30 днів' },
  { value: 'month', label: 'Цей місяць' },
  { value: 'custom', label: 'Свій період' },
];

const startOfDay = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

// Returns { from, to } (either may be null) or null when no restriction applies
export const getPeriodRange = (period, customFrom, customTo) => {
  const now = new Date();
  switch (period) {
    case '7d':
      return { from: new Date(startOfDay(now).getTime() - 6 * DAY_MS), to: null };
    case '30d':
      return { from: new Date(startOfDay(now).getTime() - 29 * DAY_MS), to: null };
    case 'month':
      return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: null };
    case 'custom': {
      const from = customFrom ? new Date(`${customFrom}T00:00:00`) : null;
      const to = customTo ? new Date(`${customTo}T23:59:59.999`) : null;
      return from || to ? { from, to } : null;
    }
    default:
      return null;
  }
};

export const isInRange = (date, range) => {
  if (!range) return true;
  if (!date) return false;
  if (range.from && date < range.from) return false;
  if (range.to && date > range.to) return false;
  return true;
};

export const validatePhone = data => {
  const errors = {};
  if (!String(data.Model ?? '').trim()) {
    errors.Model = 'Вкажіть модель';
  }
  ['Price', 'Detailprice', 'Sold_for'].forEach(field => {
    const raw = String(data[field] ?? '').trim();
    const value = Number(raw);
    if (raw === '') {
      errors[field] = 'Обов’язкове поле';
    } else if (!Number.isFinite(value)) {
      errors[field] = 'Введіть число';
    } else if (value < 0) {
      errors[field] = 'Не може бути від’ємним';
    }
  });
  return errors;
};
