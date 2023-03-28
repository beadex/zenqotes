#!/usr/bin/env node

const yargs = require('yargs');
const fetch = require('node-fetch');
const cowsay = require('cowsay');
const chalk = require('chalk');

function fetchRandomQuote() {
  return fetch('https://zenquotes.io/api/random', {
    headers: {
      accept: 'application/json',
      'accept-language': 'en-US,en;q=0.9',
      'Access-Control-Allow-Origin': '*', // CORS
    },
  });
}

function fetchTodayQuote() {
  return fetch('https://zenquotes.io/api/today', {
    headers: {
      accept: 'application/json',
      'accept-language': 'en-US,en;q=0.9',
      'Access-Control-Allow-Origin': '*', // CORS
    },
  });
}

async function main() {
  const argv = yargs
    .scriptName('zenqotes')
    .usage('$0 <cmd>')
    .command('$0', 'Get a random quote')
    .command('today', 'Get a quote for today')
    .help().argv;

  if (argv._.length > 1) {
    console.log(chalk.red('Using only one command at a time'));
  }

  if (argv._.length === 0) {
    const response = await fetchRandomQuote();
    const data = await response.json();
    const quote = `${data[0].q}\n -${data[0].a}`;
    console.log(chalk.green(cowsay.say({ text: quote })));
    console.log(chalk.blue(`© ${new Date().getFullYear()} ZenQuotes.io`));
  } else if (argv._[0] === 'today') {
    const response = await fetchTodayQuote();
    const data = await response.json();
    const quote = `${data[0].q}\n -${data[0].a}`;
    console.log('Today quote: ');
    console.log(chalk.green(cowsay.say({ text: quote })));
    console.log(chalk.blue(`© ${new Date().getFullYear()} ZenQuotes.io`));
  } else {
    console.log(chalk.red('Invalid command'));
  }
}

main();
