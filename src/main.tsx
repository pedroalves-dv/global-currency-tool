import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import SpendingPower from './components/SpendingPower/SpendingPower';

import './styles/index.scss';

const Main: React.FC = () => {
  const [toCurrency, setToCurrency] = useState<string>('USD');

  return (
    <div className="app">
      <div className="header">
        <p className="title">Global Currency Tool v0.1.2</p>
      </div>
      <div className="main-container">
        {/* <App /> */}
        <div className="currency-container">
          <CurrencyConverter setToCurrency={setToCurrency} />
        </div>
        <div className="spending-power-container">
          <SpendingPower currency={toCurrency} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
