console.log(process.env.ENVIRONMENT)
const config = require("./config/config");
const bodyParser = require('body-parser');
const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors());

app.options('*', cors());



const routes = require('./routes');
app.use("/api/v1/", bodyParser.json({ limit: "50mb" }), bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }), routes);


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