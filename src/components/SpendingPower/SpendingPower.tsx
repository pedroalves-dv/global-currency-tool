import React, { useState, useEffect } from 'react';
import costOfLivingData from '../../data/cost-of-living.json'; // Ensure correct path
import './SpendingPower.scss';

interface Purchase {
  category: string;
  description: string;
  icon: string;
  amount: number;
}

interface SpendingPowerProps {
  currency: string;
}

// Currency-to-country mapping
const currencyToCountryMap: { [key: string]: string } = {
  USD: 'United States',
  EUR: 'France',
  GBP: 'United Kingdom',
  JPY: 'Japan',
  AUD: 'Australia',
  CAD: 'Canada',
  INR: 'India',
  CNY: 'China',
  BRL: 'Brazil',
  ZAR: 'South Africa',
};

const basePrices = {
  meal: 10,
  transport: 2,
  groceries: 100, // Weekly groceries
  rent: 1000, // Monthly rent
};

const SpendingPower: React.FC<SpendingPowerProps> = ({ currency }) => {
  const [amount, setAmount] = useState<number>(100);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  // Find country based on selected currency
  const country = currencyToCountryMap[currency] || 'United States';

  useEffect(() => {
    console.log('Selected currency:', currency);
    console.log('Mapped country:', country);
    console.log('Full dataset:', costOfLivingData);

    // Print all country names to check exact format
    console.log('Available country names in JSON:');
    costOfLivingData.forEach((item: any) => console.log(item.Country));

    // Find country data with a flexible match
    const countryData = costOfLivingData.find(
      (item: any) => item.Country?.toLowerCase() === country.toLowerCase()
    );

    console.log('Country data found:', countryData);

    if (countryData) {
      // Extract relevant prices
      const mealIndex = countryData['Restaurant Price Index'] || 10;
      const transportIndex = countryData['Cost of Living Index'] || 2;
      const groceriesIndex = countryData['Groceries Index'] || 1.5;
      const rentIndex = countryData['Rent Index'] || 1000;

      // Calculate actual prices using base prices and indices
      const mealPrice = (basePrices.meal * mealIndex) / 100;
      const transportPrice = (basePrices.transport * transportIndex) / 100;
      const groceriesPrice = (basePrices.groceries * groceriesIndex) / 100;
      const rentPrice = (basePrices.rent * rentIndex) / 100;

      console.log('Meal Price:', mealPrice);
      console.log('Transport Price:', transportPrice);
      console.log('Groceries Price:', groceriesPrice);
      console.log('Rent Price:', rentPrice);

      // Update purchase data
      const purchaseData: Purchase[] = [
        {
          category: 'Meal',
          description: `With ${amount} ${currency}, you can get ${Math.floor(
            amount / mealPrice
          )} meals.`,
          icon: 'meal-icon.png',
          amount: mealPrice,
        },
        {
          category: 'Public Transport',
          description: `${amount} ${currency} equals ${Math.floor(
            amount / transportPrice
          )} one-way public transport tickets.`,
          icon: 'transport-icon.png',
          amount: transportPrice,
        },
        {
          category: 'Groceries',
          description: `${amount} ${currency} is enough to buy groceries for ${Math.floor(
            amount / groceriesPrice
          )} weeks.`,
          icon: 'groceries-icon.png',
          amount: groceriesPrice,
        },
        {
          category: 'Rent',
          description: `${amount} ${currency} is enough to pay rent for ${Math.floor(
            amount / rentPrice
          )} months.`,
          icon: 'rent-icon.png',
          amount: rentPrice,
        },
      ];

      setPurchases(purchaseData);
    } else {
      setPurchases([]); // If no data, reset purchases
    }
  }, [amount, currency, country]);

  return (
    <div className="spending-power">
      <h1>Spending Power</h1>
      <div className="balance">
        <div className="quick-conversion">
          {/* <h3>Balance</h3> */}
          <input
            type="range"
            min="1"
            max="1000"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <p className="amount">
            {amount} {currency}
          </p>
        </div>
      </div>
      <div className="purchases">
        {purchases.length > 0 ? (
          purchases.map((purchase) => (
            <div key={purchase.category} className="purchase">
              <img
                src={purchase.icon}
                alt={purchase.category}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <p>{purchase.description}</p>
            </div>
          ))
        ) : (
          <p>No cost of living data available for {country}.</p>
        )}
      </div>
    </div>
  );
};

export default SpendingPower;
