const currencyCodes = {
  // These are the only supported Currencies in the free tier, originally this was much, MUCH bigger before I realised this
  AUD: 'Australian Dollars',
  CHF: 'Swiss Francs',
  CNY: 'Chinese Yuan',
  EUR: 'Euro',
  PLN: 'Polish Złoty',
  TRY: 'Turkish Liras',
  USD: "United States Dollars"
} as const;
export default currencyCodes
