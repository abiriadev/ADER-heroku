const express = require('express');
const path = require('path');
const morgan = require('morgan')

const app = express();

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/add', (req, res) => {
	const {a, b} = req.query

	res.send(`<h1>result: ${parseInt(a) + parseInt(b)}</h1>`)
})

const port = 80 //58477
app.listen(port, () => {
	console.log(`http://127.0.0.1:${port}`)
})