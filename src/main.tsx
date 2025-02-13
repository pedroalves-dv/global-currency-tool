import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import SpendingPower from './components/SpendingPower/SpendingPower';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './styles/index.scss';

function Main() {
  const [toCurrency, setToCurrency] = useState<string>('USD');

  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <div className="currency-container">
          <CurrencyConverter setToCurrency={setToCurrency} />
        </div>
        <div className="spending-power-container">
          <SpendingPower currency={toCurrency} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
