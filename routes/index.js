const express = require("express");
const router = new express.Router();
const verbModel = require("../models/Verbe");
const APItranslate = require("../Api/APItranslate");

router.get("/", (req, res, next) => {
  res.render("index");
});

// ROUTE TO GET A RANDOM VERB AT THE BEGINNING
router.get("/randomVerb", (req, res, next) => {
  const totalVerbsNumber = 500;
  var randomNumber = Math.floor(Math.random() * Math.floor(totalVerbsNumber));

  verbModel
    .find({ custom_id: randomNumber })
    .then(dbRes => {
      const verb = dbRes[0];
      res.json(verb);
    })
    .catch(dbErr => console.log(dbErr));
});

// ROUTE TO GET A RANDOM VERB REGARDING THE SELECTED LEVEL
router.post("/smartVerb", (req, res, next) => {
  var level = req.body.level;
  var idsArray = req.body.idsArray;

  const randomNumber = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  // FUNCTION TO ENSURE THAT EVEN IF YOU PLAY HOURS, YOU WON'T ENCOUNTER TWICE THE SAME VERB (until page reload)
  const getUniqueRandomVerb = array => {
    var randomVerb = array[randomNumber(array.length - 1)];
    idsArray.includes(randomVerb.custom_id)
      ? eraseAndTryAgain(array, randomVerb)
      : res.json(randomVerb);
  };

  const eraseAndTryAgain = (array, verb) => {
    array.splice(verb.custom_id, 1);
    getUniqueRandomVerb(array);
  };

  verbModel
    .find({ level })
    .then(dbRes => {
      const verbArray = dbRes;
      getUniqueRandomVerb(verbArray);
    })
    .catch(dbErr => console.log(dbErr));
});

// ROUTE TO GET TRANSLATION REGARDING THE VERB AND THE LANG, CASE INSENSITIVE AS SOMETIMES THE TRANSLATED VERB RETURNS WITH UPPERCASE (ex: adonner => Pottering)
router.post("/translate", (req, res, next) => {
  const verbToTranslate = req.body.verb;
  const lang = req.body.lang;
  async function translateAndSend(text, target) {
    const translation = await APItranslate(text.french, target);
    console.log(translation);
    console.log(translation.length);
    res.json(translation.toLowerCase());
  }
  translateAndSend(verbToTranslate, lang);
});

module.exports = router;
