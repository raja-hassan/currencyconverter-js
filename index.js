const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

const API_KEY = 'YOUR_API_KEY'; // Replace with your API key from a currency conversion API

// Fetch available currencies and populate dropdowns
fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;
      const option2 = option1.cloneNode(true);
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });
  })
  .catch(error => console.error('Error fetching currencies:', error));

convertBtn.addEventListener('click', () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const value = amount.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[to];
      if (rate) {
        const convertedValue = (value * rate).toFixed(2);
        result.textContent = `${value} ${from} = ${convertedValue} ${to}`;
      } else {
        result.textContent = 'Invalid currency selection.';
      }
    })
    .catch(error => console.error('Error fetching conversion rate:', error));
});
