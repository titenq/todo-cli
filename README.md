#### Para editar a mensagem Answer no rawlist edite o arquivo node_modules/inquirer/lib/prompts/rawlist.js

linha 101
```javascript
message += '\n\n  Answer: ';
message += '\n\n  Digite um número: ';
```

linha 141
```javascript
onError() {
  this.render('Invalid...');
}
onError() {
  this.render('Número inválido');
}
```

#### Para editar a mensagem (y/N) no confirm edite o arquivo node_modules/inquirer/lib/prompts/confirm.js

linha 30
```javascript
this.opt.default = rawDefault ? 'Y/n' : 'y/N';
this.opt.default = rawDefault ? 's/n' : 'S/N';
```

### Linkar o projeto globalmente

```bash
npm link
```

# TODO CLI
My Node CLI is a tool for doing awesome things directly from your terminal.

## Installation

```bash
npm install -g todo
```

## Usage
To start using My Node CLI, run:

```bash
todo
```

### Commands
- `my-node-cli - name YourName`: Greets you by your name.
- `my-node-cli option1`: Executes option 1.

For more detailed information on commands, run `my-node-cli --help`.

## Contributing
Contributions are welcome ...

## License
MIT
