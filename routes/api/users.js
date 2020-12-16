const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User model
const User = require("../../models/User");

//@route GET api/users
//@desc  Register new user
//@access Public

router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //simple validation
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  // check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
    });

    //Create salt and & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { _id: user._id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// router.get("/:name", (req, res) => {
//   User.findOne(
//     { name: req.params.name },
//     {
//       _id: "$_id",
//     }
//   ).then((user) => res.json(user));
// });

router.get("/:name", (req, res) => {
  //res.send("/5fd914443452ee21d5ddad2a");
  User.findOne(
    { name: req.params.name },
    {
      _id: "$_id",
    }
  ).then((user) => res.json(user));
});

module.exports = router;
