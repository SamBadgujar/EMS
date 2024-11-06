// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// Register user
// router.post("/create", async (req, res) => {
//   const { name, email, age, mobile, work, add, desc } = req.body;

//   if (!name || !email || !age || !mobile || !work || !add || !desc) {
//     return res.status(422).json("Please fill all the fields");
//   }

//   try {
//     const existingUser = await users.findOne({ email });
//     if (existingUser) {
//       return res.status(422).json("User already exists");
//     } else {
//       const newUser = new users({
//         name,
//         email,
//         age,
//         mobile,
//         work,
//         add,
//         desc,
//       });
//       await newUser.save();
//       res.status(201).json(newUser);
//     }
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// });

router.post("/create", async (req, res) => {
  const { name, email, age, mobile, work, add, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !add || !desc) {
    return res.status(422).json({ message: "Please fill all the fields" });
  }

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    } else {
      const newUser = new users({
        name,
        email,
        age,
        mobile,
        work,
        add,
        desc,
      });
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get all users
router.get("/getdata", async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Get individual user
router.get("/getuser/:id", async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update user
// router.patch("/updateuser/:id", async (req, res) => {
//   try {
//     const updatedUser = await users.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedUser) {
//       return res.status(404).json("User not found");
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// });

// Update user
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const updatedUser = await users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const deletedUser = await users.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
