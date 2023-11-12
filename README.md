# Description

This is a simple ToDo application that allows users to create, and delete tasks.

# Getting Started

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Docker - Check the official [Docker documentation](https://docs.docker.com/engine/) for information on how to install Docker on your operating system. And then install Docker and supporting tools.
- Node.js 18 or higher - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
- [Yarn](https://yarnpkg.com/) - Install Yarn using npm:
```bash
npm install -g yarn
```

You can install only Git and Docker if you want to run the app in Docker. Otherwise, install all except Docker.

## Clone the repository

```bash
git clone git@github.com:chesanovskiydv/todo_app_javascript_front-end.git
```

## Running the application in development mode

```bash
# install dependencies
yarn install

# run the application
yarn start
```

## Running the application in production mode

```bash
# install dependencies
yarn install

# build the application
yarn build

# serve the application
yarn global add serve
serve -s build
```

## Running the app by docker-compose

```bash
docker-compose -f docker-compose.yml up
```

The app should be available on http://localhost:3000

## Running the tests

```bash
yarn test .
```
