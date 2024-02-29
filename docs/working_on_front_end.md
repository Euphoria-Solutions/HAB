# React Native TypeScript Project Documentation

Welcome to our React Native TypeScript project documentation. This guide will help you set up your development environment, outline the project structure, and provide you with the steps to run and build the application. We use ESLint and Prettier to maintain code quality and consistency.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
  - [Running the Development Server](#running-the-development-server)
- [Coding Standards](#coding-standards)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [Husky](#husky)
  - [Commitizen](#commitizen)
- [Contributing](#contributing)

## Getting Started

This section provides information on the prerequisites and steps necessary to start working with this React Native TypeScript project.

### Prerequisites

Before you begin, ensure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (version 14.x or above recommended)
- [npm](https://npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) (for running the app on a device or emulator)

### Installation

1. Install the root project dependencies

   ```bash
   yarn install
   ```


2. Navigate to the frontend directory:

   ```bash
   cd projects/front
   ```

3. Install the project dependencies:

   ```bash
   yarn install
   ```

   ```bash
   cd ios && pod install
   ```

## Development Workflow

### Running the Development Server

To start the React Native development server, run:

```bash
npm run ios
```

or with Yarn:

```bash
yarn ios
```

This will start the dev server metro with port 8081. The site will automatically reload as you make changes to the code.

### ESLint

We use ESLint to enforce coding standards. Run the following command to check your code for linting issues:

```bash
npm run lint
```

or with Yarn:

```bash
yarn lint
```

### Prettier

Prettier is configured to format our code. To format your code, run:

```bash
npm run prettier
```

or with Yarn:

```bash
yarn prettier
```

### Husky

Husky is set up with pre-commit hooks to enforce coding standards. These hooks run ESLint and Prettier checks before allowing commits.

### Commitizen

Use Commitizen for structured commit messages. Instead of using `git commit`, stage your changes and run:

```bash
yarn cz
```

or 

```bash
npx cz
```

## Contributing

We welcome contributions! Please follow our coding standards and use Commitizen for commit messages. For substantial changes, open an issue first to discuss your ideas.