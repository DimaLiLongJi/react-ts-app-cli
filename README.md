# React-ts-app-cli

A CLI for create a react app with redux and typescript


## Usage

Create a folder and run `create-react-ts-app init` in this folder.

Run `npm start` and open `http://localhost:1234/demo-page/demo` in browers.


## Project structure

### Public

React multiple entry apps

  - apps: multiple entry
  - components: common components
  - constants: some constants
  - containers: multiple entry containers for root route
  - images: static images
  - pages: pages component for route
  - store: actions and reducers for redux
  - styles: global styles
  - typings: global types
  - utils: common utils
  - vendors: vendors
  - .eslintrc: eslint congfig
  - tslint.json: tslint congfig

```
public
|
├── apps
├── components
├── constants
├── containers
├── images
├── pages
├── store
├── styles
├── typings
├── utils
├── vendors
├── .eslintrc
├── tslint.json
```

### Utils

Utils for backend

  - env.js: node envs

```
utils
|
├── env.js:
```

### Views

Node templates with ejs

  - demo-page.ejs: demo page

```
views
|
├── demo-page.ejs:
```

### Others

  - app.js: node app entry
  - tsconfig.json: typescript config
  - webpack.config.js: webpack config
