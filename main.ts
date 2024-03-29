import inquirer from "inquirer";

const conversionRates: { [key: string]: number } = {
    PKR: 1, // Pakistani Rupee
    USD: 277.90,
    EUR: 0.84,
    TRY: 8.58, // Turkish Lira
    KWD: 903.15, // Kuwaiti Dinar
    AED: 75.66, // United Arab Emirates Dirham
};

async function currencyConverter() {
    const { amount, fromCurrency, toCurrency } = await inquirer.prompt([
        {
            name: "amount",
            type: "number",
            message: "Enter the amount you want to convert:",
        },
        {
            name: "fromCurrency",
            type: "list",
            message: "Select the currency you have:",
            choices: Object.keys(conversionRates),
        },
        {
            name: "toCurrency",
            type: "list",
            message: "Select the currency you want to convert to:",
            choices: Object.keys(conversionRates),
        }
    ]);

    let convertedAmount: number;

    if (fromCurrency === 'PKR') {
        // If input currency is PKR, no conversion needed, just multiply by output currency rate
        convertedAmount = amount * conversionRates[toCurrency];
    } else {
        // Otherwise, convert from input currency to PKR, then to output currency
        convertedAmount = amount * (1 / conversionRates[fromCurrency]) * conversionRates[toCurrency];
    }

    console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`);
}

currencyConverter();
