const colors =  require("./colors.json")
const chalk = require('chalk')

// console.log(typeof colors)

for (const colorName in colors) {
	console.log(chalk.hex(colors[colorName])(`${colorName.padEnd(11)}: lorem ipsum dolor emit`));
}
