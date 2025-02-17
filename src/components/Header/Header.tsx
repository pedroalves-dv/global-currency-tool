import React, { useState, useEffect } from 'react';
import './Header.scss';
import logo from '../../assets/logo.png';

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.querySelector('.header')?.classList.add('dark-mode');
      document.querySelector('.footer')?.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.querySelector('.header')?.classList.remove('dark-mode');
      document.querySelector('.footer')?.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="header">
      <p className="title">
        {/* <span className="logo">🌐︎</span> */}
        <span className="logo">
          <img
            src={logo}
            style={{ width: '26px', height: '26px' }}
            alt="logo"
          />
        </span>
      </p>
      <button
        type="button"
        onClick={toggleDarkMode}
        className={`dark-mode-toggle ${darkMode ? 'active' : ''}`}
        aria-label="Toggle Dark Mode"
      />
    </div>
  );
}

export default Header;
