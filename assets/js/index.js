"use strict";

const currencyCodes = {
  AUD: "Australian Dollars",
  CHF: "Swiss Francs",
  CNY: "Chinese Yuan",
  EUR: "Euro",
  PLN: "Polish Złoty",
  TRY: "Turkish Liras",
  USD: "United States Dollars"
};

const apiKey = "qdxvVhmu2hXWag99cJvt4A==jRYsB1KnGXNzZdIB";
const baseApi = "https://api.api-ninjas.com/v1/convertcurrency";

const submitButton = document.getElementById("submit-button");
const currencyInput = document.getElementById("currency-amount");
const fromCurrencyDropDown = document.getElementById("from-currency");
const toCurrencyDropDown = document.getElementById("to-currency");
const output = document.getElementById("currency-output");
const outputContent = document.createElement("p");

output.append(outputContent);

function formatCurrency(isoCode, value) {
  return `${(new Intl.NumberFormat(undefined, {
    currency: isoCode,
    currencyDisplay: "narrowSymbol",
    localeMatcher: "lookup",
    style: "currency",
  })).format(value)} ${currencyCodes[isoCode]}`; // This would return something like "$1.20 Australian Dollars", "€0.88 Euro"
}

for (const [currencyName, isoCode] of Object.entries(currencyCodes)) {
  [fromCurrencyDropDown, toCurrencyDropDown].forEach(element => {
    element.add(new Option(isoCode, currencyName));
  });
}

submitButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const toCurrency = toCurrencyDropDown.value;
  const fromCurrency = fromCurrencyDropDown.value;

  const requestUrl = `${baseApi}?have=${fromCurrency}&want=${toCurrency}&amount=${currencyInput.value}`;

  submitButton.disabled = true;
  try {
    const request = fetch(requestUrl, { headers: { "X-Api-Key": apiKey }, method: "GET" });
    outputContent.textContent = "Calculating value..."; // technically we're not but shhhhhh!!!

    const response = await request;
    const data = await response.json();

    outputContent.textContent = `${formatCurrency(fromCurrency, data.old_amount)} is worth ${formatCurrency(toCurrency, data.new_amount)}`;
  }
  catch (e) {
    outputContent.textContent = "Failed to fetch the currency conversion"
  }
  finally {
    submitButton.disabled = false;
  }
});
