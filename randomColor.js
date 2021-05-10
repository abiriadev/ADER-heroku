const palette = require("./colorPalette.json")
const { rando } = require("@nastyox/rando.js")
const chalk = require("chalk")

module.export = str => chalk.hex(`#${rando(Object.values(palette)).value}`)(str)
