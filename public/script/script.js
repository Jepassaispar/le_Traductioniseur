import APIVerb from "./Api-Front/APIVerb.js";
const verbAPI = new APIVerb("http://localhost:5001");

// GLOBAL VARIABLES
const win = 1;
const lose = -1;
let score = 10;
let verb;
let level;
let translation;

//GLOBAL VARIABLES : ARRAYS
const levelArray = ["easy", "medium", "hard"];
const colorArray = ["green", "orange", "red"];
let idsArray = [];

// QUERY SELECTORS
const levelDisplay = document.querySelector(".level.display");
const spanVerb = document.querySelector(".verbContainer.french > .verb");
const inputLevel = document.querySelector(".level.input");
const inputLang = document.querySelector(".lang.input");
const button = document.querySelector(".button.verb");
const scoreDisplay = document.querySelector(".score");
const helpDisplay = document.querySelector(".help");

// SYNC FUNCTION DECLARATION
const checkLang = () => {
  return document.querySelector(".input.lang").value;
};

const checkLevel = () => {
  level = document.querySelector(".input.level").value;
  levelDisplay.innerHTML = `${levelArray[level]}`;
  changeColor(levelDisplay, colorArray[level]);
  return levelArray[level];
};

const checkGameStatus = () => {
  if (score == 0)
    alertEndGame("Achète 2000 diamants dans notre boutique pour continuer");
  if (score == 20)
    alertEndGame("Impossible que tu n'aies pas triché... Tu es banni pout 72h");
};

const checkTranslation = e => {
  const container = e.target.parentNode;
  const verbInput = container.querySelector(".input.verb").value.toLowerCase();
  if (!verbInput) return alert("entrez une traduction pour jouer");
  checkResult(verbInput === translation);
  container.querySelector(".input.verb").value = "";
};

const checkResult = result => {
  if (result) {
    changeLevel(win);
    changeScore(win);
    changeColor(button, "green");
    changeColor(scoreDisplay, "green");
  } else {
    changeLevel(lose);
    changeScore(lose);
    changeColor(button, "red");
    changeColor(scoreDisplay, "red");
  }
  setTimeout(changeColor, 2000, button, "#fee");
  setTimeout(changeColor, 2000, scoreDisplay, "white");
  checkLevel();
  checkGameStatus();
  try {
    getVerbSmartly();
  } catch (err) {
    console.log(err);
  }
};

const alertEndGame = message => {
  alert(message);
  score = 10;
  changeScore(0);
};

// DOM MANIPULATION
const changeLevel = state => {
  let level = Number(document.querySelector(".input.level").value);
  level += state;
  if (level < 0) level = 0;
  if (level > 2) level = 2;
  document.querySelector(".input.level").value = level;
  checkLevel();
};

const changeScore = state => {
  score += state;
  scoreDisplay.innerHTML = score;
};

const displayHelp = translation => {
  helpDisplay.innerHTML = translation.split("").reduce((acc, val) => {
    val === " " ? (val = `&nbsp&nbsp;`) : (val = ` _`);
    !acc ? (acc = translation[0]) : (acc += val);
    return acc;
  });
};

const displayVerb = verb => {
  spanVerb.innerHTML = verb["french"];
};

// DOM MANIPULATION : STYLE
const changeColor = (element, color) => {
  if (element.style) element.style.color = color;
};

// ASYNC FUNCTION DECLARATION
async function getVerbRandomly() {
  const res = await verbAPI.getVerbRandomly();
  verb = res.data;
  idsArray.push(verb.custom_id);
  displayVerb(verb);
  await getTranslation(verb, "en");
}

async function getVerbSmartly() {
  const res = await verbAPI.getVerbSmartly(checkLevel(), idsArray);
  verb = res.data;
  idsArray.push(verb.custom_id);
  displayVerb(verb);
  await getTranslation(verb, checkLang());
}

async function getTranslation() {
  const res = await verbAPI.getTranslation(verb, checkLang());
  translation = res.data;
  displayHelp(translation);
}

// EVENT LISTENENERS
inputLevel.onchange = getVerbSmartly;
inputLang.onchange = getTranslation;
button.onclick = checkTranslation;

// INITALISING FIRST CALL AT LOAD
try {
  getVerbRandomly();
} catch (err) {
  console.log(err);
}
