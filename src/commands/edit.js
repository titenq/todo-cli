import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

import { list } from './list.js';
import { getTodos, patchTodo } from '../api/endpoints.js';

export const edit = async () => {
  await list();

  const inputNumber = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'number',
        message: chalk.bold.cyanBright('Digite o número da tarefa a ser editada:'),
      }
    ]);

  const resultNumber = await inputNumber;
  const number = await resultNumber.number;

  const todos = await getTodos();
  const ids = Array.from({ length: todos.length }, (_, index) => String(index + 1));

  if (!ids.includes(number)) {
    console.log(chalk.bold.redBright('\nNúmero inexistente\n'));

    return;
  }

  const input = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'content',
        message: chalk.bold.cyanBright('Digite a tarefa editada:'),
      }
    ]);

  const result = await input;
  const content = await result.content;

  const loading = ora(`Processando...\n`).start();
  const _id = todos[number - 1]._id;

  await patchTodo(_id, content);

  loading.succeed(chalk.green('Tarefa editado com sucesso'));

  await list();
};
