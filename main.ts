#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from "chalk";
import axios from 'axios';

const apiKey = '6d93e5c8ffc3bf3ee40dadb6';
const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Function to get exchange rates
async function getExchangeRate(baseCurrency: string) {
    try {
        const response = await axios.get(`${baseUrl}${baseCurrency}`);
        return response.data;
    } catch (error) {
        console.error(chalk.red('Error fetching exchange rate:'), error);
        return null;
    }
}

// Function to convert currency
async function convertCurrency(baseCurrency: string, targetCurrency: string, amount: number) {
    const data = await getExchangeRate(baseCurrency);
    if (data) {
        const rate = data.conversion_rates[targetCurrency];
        if (rate) {
            const convertedAmount = amount * rate;
            console.log(chalk.green(`${amount} ${baseCurrency} is equal to ${convertedAmount.toFixed(2)} ${targetCurrency}`));
        } else {
            console.log(chalk.yellow(`Exchange rate for ${targetCurrency} not found.`));
        }
    }
}

// Function to prompt user input using Inquirer
async function promptUser() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'baseCurrency',
            message: chalk.blue('Enter the base currency (e.g., USD, EUR, GBP):'),
            validate: input => input ? true : chalk.red('Base currency is required.')
        },
        {
            type: 'input',
            name: 'targetCurrency',
            message: chalk.blue('Enter the target currency (e.g., USD, EUR, GBP):'),
            validate: input => input ? true : chalk.red('Target currency is required.'),
        },
        {
            type: 'number',
            name: 'amount',
            message: chalk.blue('Enter the amount you want to convert:'),
            validate: input => input > 0 ? true : chalk.red('Amount must be greater than zero.')
        }
    ]);

    await convertCurrency(answers.baseCurrency.toUpperCase(), answers.targetCurrency.toUpperCase(), answers.amount);
}

console.log(chalk.cyan("Welcome to the Currency Converter!"));

// Run the application
promptUser();
