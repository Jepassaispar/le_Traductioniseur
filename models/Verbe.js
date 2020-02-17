const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verbSchema = new Schema({
  custom_id: String,
  french: String,
  level: {
    type: String,
    enum: ["easy", "medium", "hard"]
  }
});

const verbModel = mongoose.model("verb", verbSchema);
module.exports = verbModel;
