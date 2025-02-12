import { useEffect, useState } from 'react';
import BaseAmount from '../BaseAmount/BaseAmount';
import Currencies from '../Currencies/Currencies';
import ResultConversion from '../ResultConversion/ResultConversion';
import './App.scss';

import currenciesData from '../../data/currencies';

import { Currency } from '../../@types/currency';

function App() {
  const [likesCount, setLikesCount] = useState(0);

  const [currency, setCurrency] = useState<Currency>(currenciesData[0]);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    console.log('La devise a changé, je change mon title');
    document.title = `${currency.description} - React Currency Converter`;

    fetch(
      `https://api.exchangerate.host/convert?from=EUR&to=${currency.code}&amount=1&access_key=f2fd6ae06abf0999da92bf08591832c8`
    )
      .then((response) => response.json())
      .then((data) => {
        setRate(data.result);
      });
  }, [currency]);

  useEffect(() => {
    console.log('ma fonction sera exécuter uniquement lors du premier rendu');
  }, []);

  return (
    <div className="app">
      <BaseAmount />
      <Currencies currencies={currenciesData} onClickCurrency={setCurrency} />
      <ResultConversion
        value={currency.rate}
        currencyName={currency.description}
      />
    </div>
  );
}

export default App;
