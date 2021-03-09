# Pug Webpack Boilerplate

### Features:-

- Configurable Webpack
- SCSS and PostCSS
- Pug Template Engine
- Removes unused css using `purgecss`
- Deploy to Github Pages with one command using `gh-pages` package

### Instructions:-

- Clone this repo or click on `Use This Template`
- Execute `yarn install`
- Execute `yarn run serve` to run dev server at `localhost:8080`

### Commands:-

`yarn run serve`: Runs the development server at localhost:8080
`yarn run build`: Builds the pages in /dist
`yarn run deploy-gh`: Builds and pushes it to `gh-pages` branch

### Note:-

- Static Files (ie. images and other third-party js, css etc) are served directly from the `public` folder and can be used directly
- Customize bootstrap or use any other scss framework in `src/scss/_framework.scss`
- To develop a new page just create a new`.pug` file in `src/pages` directory and re-run the dev server. It is somewhat similar to other static site generators like nuxtjs
