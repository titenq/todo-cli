#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';

import { list } from '../src/commands/list.js';
import { add } from '../src/commands/add.js';
import { edit } from '../src/commands/edit.js';
import { del } from '../src/commands/del.js';
import { cls } from '../src/commands/cls.js';
import { language } from '../src/commands/language.js';
import { exit } from '../src/commands/exit.js';
import { envConfig } from '../src/utils/envConfig.js';
import { strings } from '../src/utils/strings.js';

const langCli = envConfig.LANG_CLI || 'en';
console.log(langCli);

const choices = {
  [strings[langCli]['list']]: list,
  [strings[langCli]['add']]: add,
  [strings[langCli]['edit']]: edit,
  [strings[langCli]['delete']]: del,
  [strings[langCli]['clear']]: cls,
  [strings[langCli]['language']]: language,
  [strings[langCli]['exit']]: exit
};

console.log(
  chalk.bold.blueBright(figlet.textSync('TODO CLI', {
    font: 'Speed',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    whitespaceBreak: true,
  }))
);

program.version('1.0.0').description('TODO');

program.action(async () => {
  const input = await inquirer
    .prompt([
      {
        type: 'rawlist',
        name: 'choice',
        message: strings[langCli]['chooseOption'],
        choices: Object.keys(choices),
      },
    ]);
  
  const result = await input;
  const choice = choices[result.choice];
  
  await choice();

  run();
});

function run() {
  program.parse(process.argv);
}

run();
