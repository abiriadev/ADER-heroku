const express = require('express');
const path = require('path');
const morgan = require('morgan')
const chalk = require('chalk')

const app = express();

app.use(morgan('dev'))
app.use((req, res, next) => {
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	console.log(chalk.redBright(`ip: ${ip}`));

	next();
})
app.use(express.static(path.join(__dirname, 'public')))

app.get('/add', (req, res) => {
	const {a, b} = req.query

	res.send(`<h1>result: ${parseInt(a) + parseInt(b)}</h1>`)
})

const port = process.env.PORT || 80 //58477
app.listen(port, () => {
	console.log(chalk.keyword('orange')(`server running at ${chalk.cyan(`http://127.0.0.1:${port}`)}`))
})