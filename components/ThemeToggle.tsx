'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = Cookies.get('theme') as 'light' | 'dark' | undefined;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    Cookies.set('theme', newTheme, { expires: 365 });
  };

  const toggleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    color: 'inherit',
  };

  const switchStyle: React.CSSProperties = {
    position: 'relative',
    width: '50px',
    height: '24px',
    backgroundColor: theme === 'dark' ? '#4a4a4a' : '#ccc',
    borderRadius: '24px',
    transition: 'background-color 0.3s',
  };

  const sliderStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: theme === 'dark' ? '26px' : '2px',
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    transition: 'left 0.3s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };

  return (
    <button
      onClick={toggleTheme}
      style={toggleStyle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span>Dark Mode</span>
      <div style={switchStyle}>
        <div style={sliderStyle} />
      </div>
    </button>
  );
}