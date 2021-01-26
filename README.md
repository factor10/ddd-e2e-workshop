# DDD ❤️ end-to-end UI-tests

> This repo is the base for a hands on lab at [DDD Europe 2021](https://dddeurope.com/2021/).

## 0. What you need to do _before_ the lab

> If you are having any trouble with this README before the lab session, feel free to contact [Andreas Cederström on Twitter](https://twitter.com/a_cederstrom) :)

### 0.1. Install Node.js

To be able to run this lab you need to have Node.js installed. If you do not already have it you can [download it here](https://nodejs.org/en/download/). Get the LTS version if you are not sure on which one to pick.

Once installed you shall be able to start a terminal and execute the following:

```console
node --version
```

it should produce a version number. E.g. `v14.15.4` for the current LTS.

### 0.2. Get the source code

The best way to get the source code is to Git clone this repo.

Alternatively, if you do not want to Git clone it you can choose to download the repo as a ZIP file instead.

### 0.3. Install dependencies

Since we will be using Node.js you can install the dependencies with NPM or Yarn. If you do not know what any of these tools are you should go ahead using NPM.

Open a terminal and change directory to the repo you just cloned. Then install dependencies with NPM:

```console
npm install
```

## Extra

### Unit test

To run the unit tests you can execute the following in a terminal

```console
npm run test
```

or

```console
npm run test:watch
```

## Serve the lab application

You can start the application from terminal with

```console
npm run serve
```

After it has been started you can see the app running on http://localhost:3000
