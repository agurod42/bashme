# bashme

Bashme is a JavaScript library which provides a nerdy way to tell people about you. It was created with the intention to use it as a resumé replacement but it can also have other use cases. It aims to be customizable, extensible and easy to use.

## Getting Started

Install it:

```
npm install bashme
```

Use it:

```js
var bashme = new Bashme.default();
bashme.use(new Bashme.GitHub(process.env.GITHUB_APP_KEY, process.env.GITHUB_SECRET);
bashme.show(document.querySelector('#bashme'));
```

Full code in [example](example) folder.

> If you use react, you can try [react-bashme](https://github.com/agurodriguez/react-bashme).

## Contributing

### About the `bashme` instance

A `bashme` instance is the library's entry point and is reponsible to process input/output from/to the terminal and to run the tasks related to every given command.

It has two important methods, `use` and `show`, explained in the following paragraphs:

#### `use(infoProvider: InfoProvider)` 

This method registers a new `InfoProvider` in the `bashme` instance. When the `InfoProvider` is registerd it adds commands to the `bashme` instance that can be called by the user.

#### `show(domElement: HTMLElement)` 

This method converts an `HTMLElement` into a full interactive terminal (Using [`xterm.js`]()) to allow users to write the commands they want to execute.

### Adding an InfoProvider

A provider is a class that implements the [`InfoProvider`]() interface and is reponsible for filling the [`resumé`]() properties and for adding commands to the `bashme` instance.

### Adding a Command

A command is a class that implements the [`Command`]() interface and is used to perform some actions when a specific command is given.
