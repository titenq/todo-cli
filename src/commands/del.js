import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

import { list } from './list.js';
import { deleteTodo, getTodos } from '../api/endpoints.js';
import { strings } from '../utils/strings.js';
import { envConfig } from '../utils/envConfig.js';

export const del = async () => {
  try {
    await list();

    const langCli = envConfig.LANG_CLI || 'en';

    const input = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'number',
          message: chalk.bold.cyanBright(strings[langCli]['taskDeleteNumber']),
        }
      ]);

    const result = await input;
    const number = await result.number;

    const todos = await getTodos();
    const ids = Array.from({ length: todos.length }, (_, index) => String(index + 1));

    if (!ids.includes(number)) {
      console.log(chalk.bold.redBright(`\n${strings[langCli]['invalidNumber']}\n`));

      return;
    }

    const inputConfirm = await inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `${strings[langCli]['confirmDelete']} #${number}?`,
        },
      ]);
    
    const resultConfirm = await inputConfirm;

    if (!resultConfirm.confirm) {
      console.log(chalk.redBright(`\n${strings[langCli]['cancelDelete']}\n`));

      return;
    }
    
    const loading = ora(`${strings[langCli]['processing']}\n`).start();
    const _id = todos[number - 1]._id;

    await deleteTodo(_id);

    loading.succeed(chalk.green(strings[langCli]['deleteSuccess']));

    await list();
  } catch (error) {
    console.error(error);
  }
};
