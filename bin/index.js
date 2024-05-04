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
import { exit } from '../src/commands/exit.js';

const choices = {
  Listar: list,
  Adicionar: add,
  Editar: edit,
  Deletar: del,
  Limpar: cls,
  Sair: exit
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
        message: 'Escolha uma das opções:',
        choices: Object.keys(choices),
      },
    ]);
  
  const result = await input;
  const choice = await choices[result.choice];
  
  await choice();

  run();
});

function run() {
  program.parse(process.argv);
}

run();
