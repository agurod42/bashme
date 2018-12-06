# bashme

Bashme is a library which provides a nerdy way to tell people about you. It was created with the intention to use it as a resumé replacement but I it can have other use cases. It aims to be customizable, extensible and easy to use.

## Demo

Play with it in my personal website: http://agurodriguez.net

## Getting Started

Install it:

```
npm install bashme
```

Use it:

```js
var bashme = new Bashme.Bashme();
bashme.use(new Bashme.GitHub('agurodriguez'));
bashme.show(document.querySelector('#bashme'));
```

Full code in [example](example) folder.

> If you use react, you can try [react-bashme](https://github.com/agurodriguez/react-bashme).

## A bit into the code

### The `Bashme` instance

`Bashme` is the main class which acts as library's entry point. It's reponsible for processing the input/output from/to the terminal and for running the tasks related to every given command.

It has two important methods, `use` and `show`:

#### `use(provider: IProvider)` 

This method registers a new `IProvider` in the `Bashme` instance. When the `IProvider` is registerd it adds commands to the `Bashme` instance that can be called by the user.

#### `show(domElement: HTMLElement)` 

This method converts an `HTMLElement` into a full interactive terminal (Using [`xterm.js`]()) to allow users to write the commands they want to execute.

### Providers

A provider is a class that implements the [`IProvider`](src/provider/types/index.ts) interface and provides commands to the `Bashme` instance that the user can then execute.

### Commands

A command is a class that inhertis from the [`AsyncCommand`](src/command/types/index.ts) or the [`SyncCommand`](src/command/types/index.ts) classes and are used to perform some specific action.

## Built-in Providers

### GitHub

See [GitHub.ts](src/provider/GitHub.ts)

#### Commands

| Command           | Description                      |
|-------------------|----------------------------------|
| `github`          | Shows GitHub profile information           
| `github contribs` | Shows GitHub contributions
| `github orgs`     | Shows GitHub organizations
| `github repos`    | Shows GitHub repositories

### Json

See [Json.ts](src/provider/Json.ts)

#### Commands

| Command           | Description                      |
|-------------------|----------------------------------|
| `name`            | Shows name    
| `bio`             | Shows bio
| `education`       | Shows education
| `work`            | Shows work experience
| `volunteer`       | Shows volunteer experience
| `awards`          | Shows awards
| `publications`    | Shows publications
| `skills`          | Shows skills
| `languages`       | Shows languages

## License

[MIT License](LICENSE)

Copyright (c) 2018 Agustín Rodríguez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
