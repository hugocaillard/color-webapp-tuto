# Color Webapp Tuto

## [Clearness.dev](https://clearness.dev)

## Get started

```bash
$ cd color-webapp-tuto
$ npm i
$ npm run dev
```


## About the setup

### Stack

- [Vite](https://vitejs.dev/) (tooling, mainly to compile our [Typescript](https://www.typescriptlang.org/) code)
- [Preact](https://preactjs.com/) (you can use React, Vue, nothing or anything)
- [Zustand](https://github.com/pmndrs/zustand) (state-management)
- [Tailwind CSS](https://tailwindcss.com/) (styling)
- [micro-stacks](https://github.com/fungible-systems/micro-stacks) (interact with our smart contract)

### How was this repo initialized?

```bash
$ npm init vite@latest color-app
$ cd color-app
$ npm i
$ npm init @eslint/config # optional
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```
Here is the [installation guide for Tailwind](https://tailwindcss.com/docs/guides/vite). Everything else should be pretty much straight forward and up to you.
