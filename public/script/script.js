import APIVerb from "./Api-Front/APIVerb.js";
const verbAPI = new APIVerb("http://localhost:5001");

// GLOBAL VARIABLES
let score = 10;
let verb;
let level;
let translation;

//GLOBAL VARIABLES : ARRAYS
const levelArray = ["easy", "medium", "hard"];
const colorArray = ["rgba(0, 250, 0, .4)", "orange", "rgb(250, 0, 0, .4 )"];
let idsArray = [];

// QUERY SELECTORS
// INPUTS
const inputLang = document.querySelector(".lang.input");
const inputLevel = document.querySelector(".level.input");
const inputVerb = document.querySelector(".verb.input");
// DISPLAY
const levelDisplay = document.querySelector(".level.display");
const scoreDisplay = document.querySelector(".score");
const helpDisplay = document.querySelector(".help");
// OTHER
const spanVerb = document.querySelector(".verbContainer.french > .verb");
const buttonVerb = document.querySelector(".button.verb");
const buttonPass = document.querySelector(".button.pass");

// FUNCTION DECLARATION
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
  let container;
  e.target ? (container = e.target.parentNode) : buttonVerb;
  const verbInput = container.querySelector(".input.verb").value.toLowerCase();
  if (!verbInput) return alert("entre une traduction avant d'envoyer");
  checkResult(verbInput === translation);
  container.querySelector(".input.verb").value = "";
};

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
  state > 0 ? (state = "win") : (state = "lose");
  scoreDisplay.innerHTML = score;
  toggleScoreAnimation(state);
  setTimeout(toggleScoreAnimation, 5000);
};

const toggleScoreAnimation = state => {
  scoreDisplay.className = `score ${state || ""}`;
};

const alertEndGame = message => {
  alert(message);
  score = 10;
  changeScore(0);
};

const displayHelp = translation => {
  helpDisplay.innerHTML = translation.split("").reduce((acc, val, i) => {
    val === " "
      ? (val = `&nbsp&nbsp;`)
      : (val = `<i class="character char${i}" > _</i>`);
    !acc ? (acc = translation[0]) : (acc += val);
    return acc;
  });
};

const displayVerb = verb => {
  spanVerb.innerHTML = verb["french"];
};

const displayChar = e => {
  for (var i = 1; i <= translation.length - 1; i++) {
    const char = helpDisplay.querySelector(`.char${i}`);
    char
      ? i < e.target.value.length
        ? (char.innerHTML = " X")
        : (char.innerHTML = " _")
      : null;
  }
};

const checkResult = result => {
  result ? (result = 1) : (result = -1);
  toggleScoreAnimation();
  changeLevel(result);
  changeScore(result);
  checkGameStatus();
  try {
    getVerbSmartly();
  } catch (err) {
    console.log(err);
  }
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

async function getVerbSmartly(e) {
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
try {
  buttonPass.onclick = getVerbSmartly;
} catch (err) {
  console.log(err);
}
try {
  inputLevel.onchange = getVerbSmartly;
} catch (err) {
  console.log(err);
}
buttonVerb.onclick = checkTranslation;
inputLang.onchange = getTranslation;
inputVerb.onkeyup = function checkKeyPress(e) {
  e.key === "Enter" ? checkTranslation(e) : displayChar(e);
};

// INITALISING FIRST CALL AT LOAD
try {
  getVerbRandomly();
} catch (err) {
  console.log(err);
}
