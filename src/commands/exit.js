import chalk from 'chalk';

import { envConfig } from '../utils/envConfig.js';
import { strings } from '../utils/strings.js';

export const exit = () => {
  const langCli = envConfig.LANG_CLI || 'en';

  console.log(chalk.redBright(strings[langCli]['exiting']));
  process.exit(0);
};
