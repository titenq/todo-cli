import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

import { postTodo } from '../api/endpoints.js';
import { list } from './list.js';
import { strings } from '../utils/strings.js';
import { envConfig } from '../utils/envConfig.js';

export const add = async () => {
  const langCli = envConfig.LANG_CLI || 'en';

  const input = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'content',
        message: chalk.bold.cyanBright(strings[langCli]['addTask']),
      }
    ]);
  
  const result = await input;
  const content = await result.content;

  const loading = ora(`${strings[langCli]['processing']}\n`).start();

  if (content === '') {
    console.log();
    loading.fail(chalk.bold.redBright(strings[langCli]['noTask']));
    console.log();

    return;
  }

  await postTodo(content);

  loading.succeed(chalk.green(strings[langCli]['addSuccess']));

  await list();
};
