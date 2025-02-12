import { ChangeEvent, useState } from 'react';
import './Currencies.scss';
import { Currency } from '../../@types/currency';

// Passage de props
// 1ère étape : Créer le contrat de props
type CurrenciesProps = {
  currencies: Currency[];
  // Lorsque l'on clickera sur une devise, on le dira à notre composant parent
  // Je passerai en paramètre la devise sur laquel on a cliqué
  onClickCurrency: (currency: Currency) => void;
};

// 2ème étape : Déclarer les props dans le composant
function Currencies({ currencies, onClickCurrency }: CurrenciesProps) {
  // Je créer une variable d'état que je vais chercher à lier à mon input
  const [searchText, setSearchText] = useState('');

  function handleChangeSearchTextInput(event: ChangeEvent<HTMLInputElement>) {
    // Je récupère la nouvelle valeur à enregister
    const newValue = event.target.value;

    // Je modifie la valeur de ma variable d'état
    setSearchText(newValue);
  }

  // A partir de la variable searchText, je vais filter la liste des currencies
  const currenciesFiltered = currencies.filter((currency) => {
    // Je récupère le searchText que je met en miniscule
    const searchTextLowerCased = searchText.toLowerCase();

    return currency.description.toLowerCase().includes(searchTextLowerCased);
  });

  // Au click sur ma devise
  const handleClickCurrency = (currencyClicked: Currency) => {
    console.log('Click sur la currency', currencyClicked);

    // J'appel la fonction passé en props pour lui dire sur quelle devise on a cliqué
    onClickCurrency(currencyClicked);
  };

  return (
    <div className="currencies-container">
      <div className="currencies">
        <div className="currencies__title">
          <input
            type="text"
            className="currencies__input"
            // Je lie la valeur de mon input à ma variable d'état
            value={searchText}
            // Lorsque je change la valeur de mon input, je modifie la valeur de ma variable d'état
            // onChange={(event) => setSearchText(event.target.value)}
            onChange={handleChangeSearchTextInput}
          />
        </div>

        <ul className="currencies__list">
          {/* Je parcours le tableau de devise filtrer par rapport au searchText */}
          {currenciesFiltered.map((currency) => (
            <li className="currencies__item" key={currency.code}>
              <button
                type="button"
                className="currencies__item-btn"
                // 1ère étape, détecter le click sur la devise
                // J'exécuter une fonction qui elle exécutera la fonction handleClickCurrency
                // Ce qui me permet de passé en paramétre la devise sur laquelle j'ai cliqué
                onClick={() => handleClickCurrency(currency)}
              >
                {currency.description}
              </button>
            </li>
          ))}
          {currenciesFiltered.length === 0 && (
            <li className="currencies__item">
              <button type="button" className="currencies__item-btn" disabled>
                Aucune devise correspondante
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Currencies;
