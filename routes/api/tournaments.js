const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item model
const Tournament = require("../../models/Tournament");

//@route GET api/tournaments
//@desc  Get all tournaments
//@access Public

router.get("/", (req, res) => {
  Tournament.find()
    .sort({ date: -1 })
    .then((tournaments) => res.json(tournaments));
});

//@route GET api/tournaments/:userId
//@desc  Get tournament by userId
//@access Public

router.get("/:userId", (req, res) => {
  Tournament.find({ userId: req.params.userId })
    .sort({ date: -1 })
    .then((tournaments) => res.json(tournaments));
});

//@route POST api/tournaments
//@desc  Creates an item
//@access Private

router.post("/", auth, (req, res) => {
  const newTournament = new Tournament({
    name: req.body.name,
    userId: req.body.userId,
    userName: req.body.userName,
    placement: req.body.placement,
    cashedFor: req.body.cashedFor,
    buyInCost: req.body.buyInCost,
  });

  newTournament.save().then((tournament) => res.json(tournament));
});

//@route DELETE api/tournaments/:id
//@desc  DELETE a Tournament
//@access Private

router.delete("/:id", auth, (req, res) => {
  Tournament.findById(req.params.id)
    .then((tournament) =>
      tournament.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
