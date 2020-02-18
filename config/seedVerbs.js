require("dotenv").config();
const mongoose = require("mongoose");
const verbModel = require("../models/Verbe");
const fs = require("fs");
const verbNumber = process.env.VERB_NUMBER;
let verbArray = [];
let dataVerbs = [];

///////// FUNCTIONS
// function to resize an array to a desired length:
function resizeArray(arr, arrSize) {
  return arr.splice(arrSize, arr.length - 1);
}

// Use of the Fisher–Yates shuffle algorithm:
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// function to randomize levels
function randomLevel() {
  level = ["easy", "medium", "hard"];
  return shuffle(level)[0];
}

// simple function to send data to the database once and get a message back
function sendDataOnce(data, model, win) {
  console.log(data);
  model
    .insertMany(data)
    .then(console.log(win))
    .catch(err => console.log(err));
}

///////////////////////////

// I had a hard time here as I was passing as 1st argument to the readFile function a var verbFile = require("../bin/verb.txt") and it was throwing an unexpecting token error when it came to the verb "s'abaisser". If I have been more carefull I would not have waisted that much time on that.
mongoose
  .connect(`${process.env.MONGO_URI}${process.env.MONGO_COLLECTION}`, {
    userNewUrlParser: true
  })
  .then(x => {
    fs.readFile("./bin/verb.txt", "utf-8", (err, data) => {
      console.log(data);
      if (err) return console.log(err);
      verbArray = data.split("\r\n");
      shuffle(verbArray);
      resizeArray(verbArray, verbNumber);
      verbArray.map((verb, i) => {
        var verbObject = {
          french: verb,
          level: randomLevel(),
          custom_id: i + 1
        };
        dataVerbs.push(verbObject);
      });
      // sendDataOnce(
      //   dataVerbs,
      //   verbModel,
      //   `${verbNumber} verbs inseterted at ${x.connections[0].name}`
      // );
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
