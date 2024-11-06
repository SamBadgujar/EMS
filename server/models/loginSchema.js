const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    email:{
        type: "String",
        required: true,
        unique: true,
      },
      age: {
        type: "String",
        required: true,
      },
})
const loginusers = new mongoose.model("loginusers",loginSchema);


module.exports = loginusers;