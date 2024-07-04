import { useEffect, useState } from 'react';
import BaseAmount from '../BaseAmount/BaseAmount';
import Currencies from '../Currencies/Currencies';
import ResultConversion from '../ResultConversion/ResultConversion';
import './App.scss';

import currenciesData from '../../data/currencies';
import Footer from '../Footer/Footer';
import { Currency } from '../../@types/currency';

function App() {
  // Pour créer une variable Reactive avec React, il faut utiliser le hook (fonction) `useState`.
  // En argument du useState je passe la valeur initial de ma variable
  // Je récupère grace à la destructuration une variable contenant la valeur
  // et une fonction pour modifier la valeur
  // La convention veux que la fonction de modification se nomme `set` + le nom de la variable
  const [likesCount, setLikesCount] = useState(0);

  // Je créer une variable reactive qui va contenir la devise selectionné
  // Je met comme valeur par défaut la première devise de la liste
  // On peut définir le type de notre variable d'état sans passé de valeur initial
  // Il faut préciser le type entre `<>` après le useState et avatn les ()
  const [currency, setCurrency] = useState<Currency>(currenciesData[0]);
  const [rate, setRate] = useState(0);

  // Je modifie le titre de la page lorsque la devise change
  // useEffect permet d'exécuter une action (fonction) lorsqu'une variable change
  useEffect(() => {
    console.log('La devise a changé, je change mon title');
    document.title = `${currency.description} - React Currency Converter`;

    fetch(
      `http://api.exchangerate.host/convert?from=EUR&to=${currency.code}&amount=1&access_key=f2fd6ae06abf0999da92bf08591832c8`
    )
      .then((response) => response.json())
      .then((data) => {
        // data correspond à donnée retourner par l'API qui ressemble à
        // {
        //   "success": true,
        //   "terms": "https://currencylayer.com/terms",
        //   "privacy": "https://currencylayer.com/privacy",
        //   "query": {
        //     "from": "EUR",
        //     "to": "USD",
        //     "amount": 1
        //   },
        //   "info": {
        //     "timestamp": 1698315123,
        //     "quote": 1.05493
        //   },
        //   "result": 1.05493
        // }
        // Depuis les données récupérer de mon API, je stock la valeur de la conversion dans une variable d'état
        setRate(data.result);
      });
    // Lorsque mon composant est exécuter la première fois ET lorsque la variable currency change
  }, [currency]);

  useEffect(() => {
    console.log('ma fonction sera exécuter uniquement lors du premier rendu');
    // Je souhaite récupérer les données depuis une API lorsque mon composant est rendu
    // En passant un tableau de dépandance vide, je m'assure que la fonction ne sera exécuter qu'une seule fois
  }, []);

  return (
    <div className="app">
      <BaseAmount />
      {/* Je fournis la liste des currencies récupérer depuis mon fichier data/currencies.js */}
      {/* Je passe la fonction setCurrency qui sera exécuter ... au click sur la devise */}
      <Currencies currencies={currenciesData} onClickCurrency={setCurrency} />
      <ResultConversion value={rate} currencyName={currency.description} />

      {/* <Footer likesCount={likesCount} setLikesCount={setLikesCount} /> */}
    </div>
  );
}

export default App;
