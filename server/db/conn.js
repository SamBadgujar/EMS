const mongoose = require("mongoose");

const DB =
  "mongodb+srv://pavanabad01:pavanabad01@cluster0.0zjtqgt.mongodb.net/simpleAuth";

mongoose
  .connect(DB, {
    useNewurlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection start"))
  .catch((error) => console.log(error.message));
