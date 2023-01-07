# FantasyTennis

Play fantasy tennis for free!

## Live App

TBD

## Contents

-   [Run Locally](#run-locally)
-   [Deploying](#deploying)
-   [Built With](#built-with)
-   [License](#license)
-   [Project Structure](#project-structure)

## Run Locally

-   Clone the project and run `npm` to add dependencies.
    -   `$ cd FantasyTennis`
    -   `$ npm install`
-   Start the app with `npm run start`.

## Deploying

TBD

## Built With

-   [Express](https://github.com/expressjs/express)
-   [React](https://github.com/facebook/react)
-   [Typescript](https://github.com/microsoft/TypeScript)

## License

All code in this repository is provided under the [MIT License](https://github.com/AlexCadigan/FantasyTennis/blob/main/LICENSE.md).

## Project Structure

```
.
├── client
│   ├── public
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── browserconfig.xml
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.webmanifest
│   │   ├── mstile-150x150.png
│   │   ├── robots.txt
│   │   └── safari-pinned-tab.svg
│   ├── src
│   │   ├── components
│   │   │   └── App.tsx
│   │   ├── util
│   │   │   └── ReportWebVitals.ts
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── server
│   ├── src
│   │   ├── config
│   │   │   └── Config.ts
│   │   ├── routes
│   │   │   └── index.ts
│   │   ├── views
│   │   │   ├── error.pug
│   │   │   └── layout.pug
│   │   ├── App.ts
│   │   ├── AppServer.ts
│   │   └── StartApp.ts
│   ├── nodemon.json
│   └── package.json
├── tests
│   ├── client
│   │   ├── App.test.tsx
│   │   └── jest.config.json
│   ├── server
│   │   ├── App.test.ts
│   │   ├── AppServer.test.ts
│   │   └── jest.config.json
│   ├── jest.config.json
│   └── package.json
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .huskyrc.json
├── .lintstagedrc.json
├── .prettierignore
├── .prettierrc.json
├── LICENSE.md
├── README.md
├── package-lock.json
├── package.json
└── tsconfig.json
```
