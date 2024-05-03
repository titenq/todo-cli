import chalk from 'chalk';

import { getTodos } from '../api/endpoints.js';
import { formatDate } from '../utils/formatDate.js';

export const list = async () => {
  const response = await getTodos();

  response.forEach((item, i) => {
    console.log(chalk.blueBright(`${i + 1}: ${item.content} - ${formatDate(item.createdAt)}`));
  });
};
