import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import chalk from 'chalk';

import { strings } from './strings.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const languages = [
  'en',
  'pt-br',
  'es'
];

const lang = () => {
  try {
    const args = process.argv.slice(2);
    const langArgs = args.find(arg => arg.startsWith('--lang='));
    
    if (!langArgs) {
      console.log(chalk.bold.redBright(strings['en'].langIsNotDefine));

      return;
    }

    const langArg = langArgs.split('=')[1];

    if (!languages.includes(langArg)) {
      console.log(chalk.bold.redBright('invalid lang'));

      return;
    }

    const envFilePath = path.resolve(__dirname, '..', '..', '.env');
    const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

    envConfig.LANG_CLI = langArg;

    fs.writeFileSync(envFilePath,
      Object
        .entries(envConfig)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n')
    );

    const searchRawlistLine1 = "      message += '\\n  Answer: ';";
    const replaceRawlistLine1 = "      message += '\\n\\n  Digite um número: ';";

    const searchRawlistLine2 = "    this.render('Please enter a valid index');";
    const replaceRawlistLine2 = "    this.render('Número inválido');";

    const searchConfirmLine = "    this.opt.default = rawDefault ? 'Y/n' : 'y/N';";
    const replaceConfirmLine = "    this.opt.default = rawDefault ? 's/n' : 'S/N';";

    const rawlistPath = path.resolve(__dirname, '..', '..', 'node_modules', 'inquirer', 'lib', 'prompts', 'rawlist.js');
    const confirmPath = path.resolve(__dirname, '..', '..', 'node_modules', 'inquirer', 'lib', 'prompts', 'confirm.js');

    let fileContentRawlist = '';

    const readStreamRawlist = fs.createReadStream(rawlistPath);

    const rlRawList = readline.createInterface({
      input: readStreamRawlist,
      output: process.stdout,
      terminal: false
    });

    rlRawList.on('line', line => {
      if (line.includes(searchRawlistLine1)) {
        fileContentRawlist += `${replaceRawlistLine1}\n`;
      } else if (line.includes(searchRawlistLine2)) {
        fileContentRawlist += `${replaceRawlistLine2}\n`;
      } else {
        fileContentRawlist += `${line}\n`;
      }
    });

    rlRawList.on('close', () => {
      fs.writeFileSync(rawlistPath, fileContentRawlist, 'utf8');
    });

    let fileContentConfirm = '';

    const readStreamConfirm = fs.createReadStream(confirmPath);

    const rlConfirm = readline.createInterface({
      input: readStreamConfirm,
      output: process.stdout,
      terminal: false
    });

    rlConfirm.on('line', line => {
      if (line.includes(searchConfirmLine)) {
        fileContentConfirm += `${replaceConfirmLine}\n`;
      } else {
        fileContentConfirm += `${line}\n`;
      }
    });

    rlConfirm.on('close', () => {
      fs.writeFileSync(confirmPath, fileContentConfirm, 'utf8');
    });

    console.log(chalk.bold.greenBright('\nLinguagem atual: ptbr\n'));
  } catch (error) {
    console.error(error);
  }
};

lang();
