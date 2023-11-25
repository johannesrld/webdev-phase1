import currencyCodes from "./currencyCodes.js";

const apiKey = "qdxvVhmu2hXWag99cJvt4A==jRYsB1KnGXNzZdIB" as const;
const baseApi = "https://api.api-ninjas.com/v1/convertcurrency" as const;
type currencyData = {
  new_amount: number,
  new_currency: keyof typeof currencyCodes,
  old_currency: keyof typeof currencyCodes,
  old_amount: number
  error?: string
};

const submitButton = document.getElementById("submit-button") as HTMLButtonElement;
const currencyInput = document.getElementById("currency-amount") as HTMLInputElement;
const fromCurrencyDropDown = document.getElementById("from-currency") as HTMLSelectElement;
const toCurrencyDropDown = document.getElementById("to-currency") as HTMLSelectElement;
const output = document.getElementById("currency-output") as HTMLDivElement;
const outputContent = document.createElement("p");
output.appendChild(outputContent);

function formatCurrency(isoCode: keyof typeof currencyCodes, value: number) {
  return `${(new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: isoCode,
    currencyDisplay: "narrowSymbol",
    localeMatcher: "lookup",
  })).format(value)} ${currencyCodes[isoCode]}` //This would return something like "$1.20 Australian Dollars", "€0.88 Euro"
}

for (const [currencyName, isoCode] of Object.entries(currencyCodes)) {
  [fromCurrencyDropDown, toCurrencyDropDown].forEach(element => {
    element.add(new Option(isoCode, currencyName));
  })
}

submitButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const toCurrency = toCurrencyDropDown.value as keyof typeof currencyCodes
  const fromCurrency = fromCurrencyDropDown.value as keyof typeof currencyCodes

  const requestUrl = `${baseApi}?have=${fromCurrency}&want=${toCurrency}&amount=${currencyInput.value}`;

  const request = fetch(requestUrl, { headers: { "X-Api-Key": apiKey }, method: "GET" });
  outputContent.textContent = "Calculating value..."; // technically we're not but shhhhhh!!!
  submitButton.disabled = true;
  try {
    const response = await request
    const data: currencyData = await response.json()
    outputContent.textContent = `${formatCurrency(fromCurrency, data.old_amount)} is worth ${formatCurrency(toCurrency, data.new_amount)}`
  } finally {
    submitButton.disabled = false;
  }
})
