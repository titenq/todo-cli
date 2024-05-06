import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import inquirer from 'inquirer';
import chalk from 'chalk';

import { strings } from '../utils/strings.js';
import { envConfig } from '../utils/envConfig.js';

dotenv.config();

const oldLangCli = envConfig.LANG_CLI || 'en';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFilePath = path.resolve(__dirname, '..', '..', '.env');

const languages = {
  'English': 'en',
  'Português': 'pt-br',
  'Español': 'es'
};

export const language = async () => {
  try {
    const input = await inquirer
      .prompt([
        {
          type: 'rawlist',
          name: 'language',
          message: strings[oldLangCli]['chooseLanguage'],
          choices: Object.keys(languages),
        },
      ]);

    const result = await input;
    const choice = await languages[result.language];

    envConfig.LANG_CLI = choice;

    fs.writeFileSync(envFilePath,
      Object
        .entries(envConfig)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n')
    );

    const searchRawlistLine1 = strings[oldLangCli]['answer'];
    const replaceRawlistLine1 = strings[choice]['answer'];

    const searchRawlistLine2 = strings[oldLangCli]['validIndex'];
    const replaceRawlistLine2 = strings[choice]['validIndex'];

    const searchConfirmLine = strings[oldLangCli]['yesNo'];
    const replaceConfirmLine = strings[choice]['yesNo'];

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

    console.log(chalk.bold.greenBright(`\n${strings[choice]['currentLanguage']}: ${choice}\n`));
  } catch (error) {
    console.error(error);
  }
};
