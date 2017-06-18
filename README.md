# ES6 Frontend boilerplate for 2017

This is simple boilerplate that I use for my projects when using React. It's mostly based on what's popular now and in 2016.

The project includes:

- webpack configuration for building for production & development environments
- webpack dev server for developing
- Usage with:
  - ES6 syntax (even for webpack config)
  - React
  - Immutable.js
  - Redux & ReduxThunk
  - CSS modules & SASS
- reasonable eslint configuration

You will find an example of `App` component so you can figure out how the structure of the project is intended, along with sample `Redux` application state.

## Building & running

The project is intended to be used with __Yarn__.

### Installation

`yarn install`

### Run in development

`yarn start`

### Run tests

`yarn test`

### Building

`yarn build` to build app with development options

`yarn build:production` to build app with production options

The files will be in `/build` folder.