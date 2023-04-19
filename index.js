const config = require("./config/config");
const express = require('express');
require("dotenv").config();
const app = express();
console.log(process.env.ENVIRONMENT)
const cors = require('cors');
const routes = require('./routes');
global.dbConnErr = require('./config/db.config');
global.dbConnErr();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use("/api/v1", routes);


app.get("/health", (req, res) => {
	res.send("Okay 100");
})

app.get("/", (req, res) => {
	res.send({ "version": process.env.npm_package_version });
});

// if (process.env.ENVIRONMENT == "debug") {
app.listen(config.port, () => {
	console.log(`Service endpoint= localhost : ${config.port}`);
});

console.log("App version : ", process.env.npm_package_version);