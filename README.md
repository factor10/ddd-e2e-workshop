# DDD ❤️ end-to-end UI-tests

This repo is the base for a hands on lab at [DDD Europe 2021](https://dddeurope.com/2021/).

In the lab we will be using cypress for writing UI-tests for a super "raw" time reporting application written in typescript.

## 0. What you need to do _before_ the lab

You need to install node and cypress (which will bring some dependencies as well). You find instructions below.

If you are having any trouble with this README before the lab session, feel free to contact [Andreas Cederström on Twitter](https://twitter.com/a_cederstrom) :)

### 0.1. Install Node.js

To be able to run this lab you need to have Node.js installed. If you do not already have it you can [download it here](https://nodejs.org/en/download/). Get the LTS version if you are not sure on which one to pick.

Once installed you shall be able to start a terminal and execute the following:

```console
node --version
```

it should produce a version number. E.g. `v14.15.4` for the current LTS. We have tested for example with `v12.14.1` and it worked just fine as well.

### 0.2. Get the source code

The best way to get the source code is to `git clone` this repo.

Alternatively, if you do not want to `git clone` it you can choose to download the repo as a ZIP file instead.

### 0.3. Install dependencies

Since we will be using Node.js you can install the dependencies with npm. If you do not know what any of these tools are you should go ahead using npm.

Change directory to the repo you just cloned. Then install dependencies with npm:

```console
npm install
```

## 1. Check that it works

### 1.1. Unit tests

To run the unit tests you can execute the following in a terminal

```console
npm run test
```

### 1.2. Serve the lab application

You can start the application from terminal with

```console
npm run serve
```

After it has been started you can see the app running on http://localhost:3000

### 1.3. Serve the lab application for Cypress tests

```console
npm run serve:e2e
```

### 1.4. Run Cypress test headless

```console
npm run cypress
```

### 1.5. Run Cypress UI Test Runner

```console
npm run cypress:open
```
