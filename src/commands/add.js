import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

import { postTodo } from '../api/endpoints.js';
import { list } from './list.js';

export const add = async () => {
  const input = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'content',
        message: chalk.bold.cyanBright('Digite a tarefa:'),
      }
    ]);
  
  const result = await input;
  const content = await result.content;

  const loading = ora(`Processando...\n`).start();

  if (content === '') {
    console.log();
    loading.fail(chalk.bold.redBright('Você não digitou uma tarefa'));
    console.log();

    return;
  }

  await postTodo(content);

  loading.succeed(chalk.green('Todo adicionado com sucesso'));

  await list();
};
