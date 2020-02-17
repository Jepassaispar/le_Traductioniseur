const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URI}${process.env.MONGO_COLLECTION}`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () =>
  console.log("yay mongodb connected :)")
);

mongoose.connection.on("error", () => console.log("nay db error sorry :("));
