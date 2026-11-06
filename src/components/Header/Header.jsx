import React, { useState } from 'react';
import { applyTheme } from '../../utils/theme';
import s from './Header.module.css';

const Header = () => {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <button
          type="button"
          className={s.themeToggle}
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Світла тема' : 'Темна тема'}
          aria-label="Перемкнути тему"
        >
          {theme === 'dark' ? '☀️ Світла' : '🌙 Темна'}
        </button>
        <div className={s.logo}>
          <span className={s.logoIcon}>📱</span>
          <h1>Phone Repair Manager</h1>
        </div>
        <p className={s.subtitle}>Управління ремонтом і продажем телефонів</p>
      </div>
    </header>
  );
};

export default Header;
