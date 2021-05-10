const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const chalk = require("chalk");

const app1 = express();

app1.use(morgan("dev"));
app1.use((req, res, next) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let color = null;

  if (ip === "::ffff:127.0.0.1") {
    ip = "LOCALHOST";
    color = chalk.redBright;
  } else color = chalk.greenBright;

  console.log(color(`ip: ${ip}`));

  next();
});
app1.use(express.static(path.join(__dirname, "public")));

app1.get("/add", (req, res) => {
  const {a, b} = req.query;

  res.send(`<h1>result: ${parseInt(a) + parseInt(b)}</h1>`);
});

// const port = process.env.PORT || 80 //58477
// app1.listen(port, () => {
// console.log(chalk.keyword('orange')(`server running at ${chalk.cyan(`http://127.0.0.1:${port}`)}`))
// })
const api1 = functions.https.onRequest(app1);

module.exports = {
  api1,
};
