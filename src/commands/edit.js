import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

import { list } from './list.js';
import { getTodos, patchTodo } from '../api/endpoints.js';
import { envConfig } from '../utils/envConfig.js';
import { strings } from '../utils/strings.js';

export const edit = async () => {
  await list();

  const langCli = envConfig.LANG_CLI || 'en';

  const inputNumber = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'number',
        message: chalk.bold.cyanBright(strings[langCli]['taskEditNumber']),
      }
    ]);

  const resultNumber = await inputNumber;
  const number = await resultNumber.number;

  const todos = await getTodos();
  const ids = Array.from({ length: todos.length }, (_, index) => String(index + 1));

  if (!ids.includes(number)) {
    console.log(chalk.bold.redBright(`\n${strings[langCli]['invalidNumber']}\n`));

    return;
  }

  const input = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'content',
        message: chalk.bold.cyanBright(strings[langCli]['editedTask']),
      }
    ]);

  const result = await input;
  const content = await result.content;

  const loading = ora(`${strings[langCli]['processing']}\n`).start();
  const _id = todos[number - 1]._id;

  await patchTodo(_id, content);

  loading.succeed(chalk.green(strings[langCli]['editSuccess']));

  await list();
};
