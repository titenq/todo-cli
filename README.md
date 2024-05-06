![GitHub Repo stars](https://img.shields.io/github/stars/titenq/todo-cli)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/titenq/todo-cli)
![GitHub forks](https://img.shields.io/github/forks/titenq/todo-cli)


# TODO CLI
![JrxEL1S.png](https://iili.io/JrxEL1S.png)
Aplicação CLI de gerenciamento de tarefas diretamente no terminal.

## Pré-requisitos
Ter o [NodeJS](https://nodejs.org/) e o [Git](https://git-scm.com/) instalados.

### Para instalar
```bash
git clone git@github.com:titenq/todo-cli.git
```

```bash
cd todo-cli
```

```bash
npm install
```

```bash
npm link
```

## Para usar
```bash
todo
```

### Para desinstalar
```bash
npm uninstall --global todo
```

#### Para editar a mensagem Answer no rawlist edite o arquivo
`node_modules/inquirer/lib/prompts/rawlist.js`

`linha 101`
```javascript
message += '\n\n  Answer: ';
message += '\n\n  Digite um número: ';
```

`linha 141`
```javascript
onError() {
  this.render('Invalid...');
}
onError() {
  this.render('Número inválido');
}
```

#### Para editar a mensagem (y/N) no confirm edite o arquivo
`node_modules/inquirer/lib/prompts/confirm.js`

`linha 30`
```javascript
this.opt.default = rawDefault ? 'Y/n' : 'y/N';
this.opt.default = rawDefault ? 's/n' : 'S/N';
```

## License
Distribuído sob a licença MIT. Consulte `LICENSE.txt` para obter mais informações.
