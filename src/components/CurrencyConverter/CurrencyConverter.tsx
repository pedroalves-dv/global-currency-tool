import React, { useState, useEffect } from 'react';
import './CurrencyConverter.scss';

interface Currency {
  code: string;
  name: string;
}

interface CurrencyConverterProps {
  setToCurrency: (currency: string) => void;
}

function CurrencyConverter({ setToCurrency }: CurrencyConverterProps) {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrencyState] = useState<string>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    fetch('https://openexchangerates.org/api/currencies.json')
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.keys(data).map((code) => ({
          code,
          name: data[code],
        }));
        setCurrencies(currencyList);
      });

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  const convert = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrencyState(fromCurrency);
    setToCurrency(fromCurrency);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newToCurrency = e.target.value;
    setToCurrencyState(newToCurrency);
    setToCurrency(newToCurrency);
  };

  return (
    <div className="currency-converter">
      <div className="converter-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        <div className="buttons">
          <button
            type="button"
            className="swap-button"
            onClick={swapCurrencies}
          >
            ⇄
          </button>
          <button type="button" className="convert-button" onClick={convert}>
            Convert
          </button>
        </div>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>

        <div className="result">
          {(amount * exchangeRate).toFixed(3)} {toCurrency}
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
