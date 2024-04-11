// let studentData: any =
// {
//     name: "Ahmed",
//     age: 15,
//     rollnum: 1234,
//     address: "Karachi"
// }
// let property = "age"
// console.log(studentData[property]);
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.red.bgYellow("Welcome To The Currency Converter"));
const currency = {
    USD: 1,
    EUR: 0.96,
    GBP: 0.76,
    INR: 74.57,
    PKR: 277,
};
let userAnswer = await inquirer.prompt([
    {
        name: "from",
        message: "Enter From Currency",
        type: "list",
        choices: ["USD", "EUR", "GBP", "INR", "PKR"]
    },
    {
        name: "to",
        message: "Enter To Currency",
        type: "list",
        choices: ["USD", "EUR", "GBP", "INR", "PKR"]
    },
    {
        name: "amount",
        message: "Enter Your Amount",
        type: "number",
    }
]);
let fromAmount = currency[userAnswer.from];
let toAmount = currency[userAnswer.to];
let amount = userAnswer.amount;
let baseAmount = amount / fromAmount;
let convertedAmount = baseAmount * toAmount;
console.log(chalk.greenBright("Converted Amount:"), convertedAmount);
