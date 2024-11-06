require("dotenv").config();
const express=require("express");
const app = express();
const mongoose=require("mongoose");
const users = require("./models/userSchema");
const loginusers=require("./models/loginSchema.js");
require("./db/conn");
const cors = require("cors");
const router = require("./routes/router.js");
const router1=require("./routes/router1.js")

const port = 3002;



app.use(cors());
app.use(express.json());
app.use(router);
app.use(router1);
app.listen(port,()=>{
    console.log(`server is start port : ${port}`);
});