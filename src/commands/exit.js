import chalk from 'chalk';

export const exit = async () => {
  console.log(chalk.redBright('Saindo da aplicação...'));
  process.exit(0);
};
