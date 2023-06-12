# Cypress Blog Example using Astro

### About

This is an example of how you can use Cypress for end to end testing.\
In this example I've build a super simple blog application that show's all posts of
a user and allows the user to create posts.\
Cypress is used to verify that a user can indeed sign in, view and create posts.

### Try it locally

> **Info**\
> A in-memory SQLite Database is used if started in DEV Mode.

#### Clone repository

```sh
git clone https://github.com/adnanbrq/cypress-example.git && cd cypress-example
```

#### Install dependencies and start dev server

```sh
pnpm i && pnpm dev
```

#### Run cypress tests

```sh
pnpm cypress run
```
