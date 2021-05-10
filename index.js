const express = require("express")
const path = require("path")
const morgan = require("morgan")
const chalk = require("chalk")
const IPtable = require('./IPtable')
const randomColor = require('./randomColor')

// chalk.keyword()

const app = express()

app.use(morgan("dev"))
app.use((req, res, next) => {
    let ipStr = req.headers["x-forwarded-for"] || req.connection.remoteAddress
    let color = null

	const IP = ipStr.match(/\d+\.\d+\.\d+\.\d/)?.[0]

	const clientName = IPtable[IP]

    if (ipStr === "::ffff:") {
        ipStr = ""
        color = chalk.redBright
    } else color = chalk.greenBright

    console.log(color(`ip: ${ipStr}`))

    next()
})
app.use(express.static(path.join(__dirname, "public")))

const wrap = (tag, attrs) => content => `<${tag}>${content}</${tag}>`

const isRangeOver = num => num < -99999999 || num > 99999999
const isInvalidNumber = num => isNaN(num) || typeof num !== "number"

const resultPage = res => wrap("h1")(`result: ${res}`)
const invalidTypePage = (floats, numbers) =>
    wrap("h1")(
        `"${numbers.filter(n => isInvalidNumber(parseFloat(n))).join(", ")}" is not a Number type.`,
    )
const rangeErrorPage = floats =>
    wrap("h1")(`${floats.filter(isRangeOver).join(", ")} this number is too large or too small!`)

app.get("/add", (req, res) => {
    const { a, b } = req.query

    const numbers = [a, b]

    const floats = numbers.map(parseFloat)

    if (floats.some(isInvalidNumber)) return res.send(invalidTypePage(floats, numbers))
    if (floats.some(isRangeOver)) return res.send(rangeErrorPage(floats))

    res.send(resultPage(floats.reduce((a, b) => a + b)))
})

const port = process.env.PORT || 80 //58477
app.listen(port, () => {
    console.log(
        chalk.keyword("orange")(
            `server running at ${chalk.cyan(`http://127.0.0.1:${port}`)}`,
        ),
    )
})
