import currency_list from "./currencyCodes.js";

const apiKey = "" as const;
const baseApi = "https://api.api-ninjas.com/v1/convertcurrency" as const;

type currencyResp = {
    new_amount: number,
    new_currency: string,
    old_currency: string,
    old_amount: number
};
const submitButton = document.getElementById("submit-button") as HTMLButtonElement;
const currencyInput = document.getElementById("initial-amount") as HTMLInputElement;
const fromCurrency = document.getElementById("from-currency") as HTMLSelectElement;
const toCurrency = document.getElementById("to-currency") as HTMLSelectElement;
const output = document.getElementById("currency-output") as HTMLDivElement;

for (const [currencyName, isoCode] of currency_list) {
    [fromCurrency, toCurrency].forEach(elem => {
        elem.add(new Option(currencyName, isoCode));
    })
}
submitButton.addEventListener("keypress", ev => {
    ev.preventDefault();
    const requestUrl = baseApi + `?have=${fromCurrency.value}&want=${toCurrency.value}&amount=${currencyInput.value}`;

    fetch(requestUrl, { method: "GET", headers: { "X-Api-Key": apiKey }, })
        .then(resp => {
            if (resp.ok === false) throw "";
            return resp.json();
        })
        .then((currencyData: currencyResp) => {
            // Ideally I would use Intl.Numberformat to display currency correctly
            // e.g. Japanese Yen would show "￥9876,90583" etc.
            output.innerHTML = `<p>${currencyData.new_amount}</p>`
        })
        .catch();
})
// use dat ato build message and set dom element to said message
