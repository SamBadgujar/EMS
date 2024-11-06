const express = require("express");
const router1 = express.Router();
const loginusers = require("../models/loginSchema");

// Routes
router1.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await loginusers.findOne({ email, password });
    if (user) {
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  
module.exports = router1;