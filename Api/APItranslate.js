// This Api right here seems all nice and fun but it took me quite some time to setup my google project and make it work
const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

async function translateText(text, target) {
  try {
    let translation = await translate.translate(text, target);
    return translation[0];
  } catch (err) {
    console.log(err);
  }
}

module.exports = translateText;
