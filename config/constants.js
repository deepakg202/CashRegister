const path = require('path')

const dir_constants = {
  MAIN_DIR: path.resolve(__dirname, '../'),
  OUTPUT_DIR: 'dist',
  PUBLIC_DIR: 'public',
  SRC_DIR: 'src',
  PAGES_DIR: 'src/pages',
  // Below properties are not used
  LAYOUTS_DIR: 'src/layouts',
  COMPONENTS_DIR: 'src/components'
}
Object.keys(dir_constants).forEach((p) => {
  dir_constants[p] = path.resolve(dir_constants.MAIN_DIR,dir_constants[p])
})
const misc = {
  PORT: 8080
}

module.exports = Object.assign(dir_constants, misc)