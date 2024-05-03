import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

import { list } from './list.js';
import { deleteTodo, getTodos } from '../api/endpoints.js';

export const del = async () => {
  try {
    await list();

    const input = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'number',
          message: chalk.bold.cyanBright('Digite o número da tarefa a ser deletada:'),
        }
      ]);

    const result = await input;
    const number = await result.number;

    const todos = await getTodos();
    const ids = Array.from({ length: todos.length }, (_, index) => String(index + 1));

    if (!ids.includes(number)) {
      console.log(chalk.bold.redBright('\nNúmero inexistente\n'));

      return;
    }

    const inputConfirm = await inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Tem certeza que deseja excluir a tarefa #${number}?`,
        },
      ]);
    
    const resultConfirm = await inputConfirm;

    if (!resultConfirm.confirm) {
      console.log(chalk.redBright('\nCancelado pelo usuário\n'));

      return;
    }
    
    const loading = ora(`Processando...\n`).start();
    const _id = todos[number - 1]._id;

    await deleteTodo(_id);

    loading.succeed(chalk.green('Todo deletado com sucesso'));

    await list();
  } catch (error) {
    console.error(error);
  }
};
