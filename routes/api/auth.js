const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User model
const User = require("../../models/User");

//@route GET api/auth
//@desc  Auth user
//@access Public

router.post("/", (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  // check fo existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

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

//@route GET api/auth/user
//@desc  Get user data
//@access Private

// router.get("/:name", (req, res) => {
//   //res.send("/5fd914443452ee21d5ddad2a");
//   User.findOne(
//     { name: req.params.name },
//     {
//       _id: "$_id",
//     }
//   ).then((user) => res.json(user));
// });

router.get("/userLogin", auth, (req, res) => {
  User.findById(req.user._id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
