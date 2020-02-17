// That was a bit tricky as I always worked with at least hbs with the back-end and I tried to find a way to use html without a template engine
require("dotenv").config();
require("./config/mongoose");
const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const index = require("./routes/index");
app.use("/", index);

module.exports = app;
