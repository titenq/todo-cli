import chalk from 'chalk';

import { getTodos } from '../api/endpoints.js';
import { formatDate } from '../utils/formatDate.js';
import { envConfig } from '../utils/envConfig.js';


export const list = async () => {
  const langCli = envConfig.LANG_CLI || 'en';

  const response = await getTodos();

  response.forEach((item, i) => {
    console.log(chalk.yellowBright(`${chalk.magentaBright(`${ i + 1}:`)} ${item.content} ${chalk.gray([`${ formatDate(item.createdAt, langCli)}`])}`));
  });
  
  console.log();
};
