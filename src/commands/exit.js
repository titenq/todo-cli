import chalk from 'chalk';

export const exit = async () => {
  console.log(chalk.greenBright('Saindo da aplicação...'));
  process.exit(0);
};
