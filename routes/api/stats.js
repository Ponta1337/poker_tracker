const express = require("express");
const router = express.Router();

const Tournament = require("../../models/Tournament");

//Count number of played tournaments
// router.get("/:userId", (req, res) => {
//   Tournament.find({ userId: req.params.userId })
//     .sort({ date: -1 })
//     .then((tournaments) => res.json(tournaments));
// });

//@route GET api/stats/count/:userId
//@desc  Get number of tournaments played by userId
//@access Public
router.get("/count/:userId", (req, res) => {
  Tournament.where({ userId: req.params.userId })
    .countDocuments()
    //   .sort({ date: -1 })
    .then((tournaments) => res.json(tournaments));
});

//@route GET api/stats/cashes/:userId
//@desc  Get sum of what user cashedFor
//@access Public
router.get("/cashes/:userId", (req, res) => {
  Tournament.aggregate([
    { $match: { userId: req.params.userId } },
    { $group: { _id: "$userId", total: { $sum: "$cashedFor" } } },
  ]).then((tournaments) => res.json(tournaments));
});

//@route GET api/stats/biggestcash/:userId
//@desc  Get the number of the biggest cash
//@access Public
router.get("/biggestcash/:userId", (req, res) => {
  Tournament.aggregate([
    { $match: { userId: req.params.userId } },
    { $group: { _id: "$userId", total: { $max: "$cashedFor" } } },
  ]).then((tournaments) => res.json(tournaments));
});

//@route GET api/stats/totalearnings/:userId
//@desc  Get the number of the biggest cash
//@access Public

// router.get("/totalearnings/:userId", (req, res) => {
//   Tournament.aggregate([
//     { $match: { userId: req.params.userId } },
//     {
//       $group: {
//         _id: "$userId",
//         total: { $subtract: [{ $add: "$cashedfor" }, { $sum: "$buyInCost" }] },
//       },
//     },
//   ]).then((tournaments) => res.json(tournaments));
// });

//Get stats by userId
// router.get("/allstats/:userId", (req, res) => {
//   Tournament.aggregate([
//     { $match: { userId: req.params.userId } },
//     {
//       $group: {
//         _id: "$userId",
//         buyInCostSum: { $sum: "$buyInCost" },
//         cashedForSum: { $sum: "$cashedFor" },
//         biggestCash: { $max: "$cashedFor" },
//         avgBuyIn: { $avg: "$buyInCost" },
//       },
//     },
//     {
//       $addFields: {
//         totalEarnings: { $subtract: ["$cashedForSum", "$buyInCostSum"] },
//         ROI: {
//           $multiply: [
//             {
//               $divide: [
//                 { $subtract: ["$cashedForSum", "$buyInCostSum"] },
//                 "$buyInCostSum",
//               ],
//             },
//             100,
//           ],
//         },
//       },
//     },
//   ]).then((tournaments) => res.json(tournaments));
// });

// "/^" + req.params.userName + "/"
router.get("/allstatss/:userName", (req, res) => {
  var userNameParams = req.params.userName;
  Tournament.find({
    userName: new RegExp("^" + userNameParams + "$", "i"),
  }).then((tournaments) => res.json(tournaments));
});
//`/api/tournaments/${userId}`;

router.get("/id/:userName", (req, res) => {
  let name = req.params.userName;
  Tournament.aggregate([
    { $match: { userName: new RegExp("^" + name + "$", "i") } },
    {
      $group: {
        _id: "$userId",
      },
    },
  ]).then((tournaments) => res.json(tournaments));
});

//Get all stats by userId
router.get("/allstats/:userId", (req, res) => {
  Tournament.aggregate([
    // { $match: { userName: new RegExp("^" + hej + "$", "i") } },
    { $match: { userId: req.params.userId } },
    {
      $group: {
        _id: "$userId",
        buyInCostSum: { $sum: "$buyInCost" },
        cashedForSum: { $sum: "$cashedFor" },
        biggestCash: { $max: "$cashedFor" },
        avgBuyIn: { $avg: "$buyInCost" },
      },
    },
    {
      $addFields: {
        totalEarnings: { $subtract: ["$cashedForSum", "$buyInCostSum"] },
        ROI: {
          $multiply: [
            {
              $divide: [
                { $subtract: ["$cashedForSum", "$buyInCostSum"] },
                "$buyInCostSum",
              ],
            },
            100,
          ],
        },
      },
    },
  ]).then((tournaments) => res.json(tournaments));
});

///Get 5 to earners
router.get("/leaderboard", (req, res) => {
  Tournament.aggregate([
    // { $match: { userId: req.params.userId } },

    {
      $group: {
        _id: { userId: "$userId", userName: "$userName" },

        buyInCostSum: { $sum: "$buyInCost" },
        cashedForSum: { $sum: "$cashedFor" },
      },
    },

    {
      $addFields: {
        totalEarnings: { $subtract: ["$cashedForSum", "$buyInCostSum"] },
      },
    },
    { $sort: { totalEarnings: -1 } },
  ])
    .limit(10)
    .then((tournaments) => res.json(tournaments));
});

router.get("/leaderboards", (req, res) => {
  Tournament.group([
    {
      key: {},
    },
  ]);
});
// { $match: { userId: req.params.userId } },

router.get("/topearners", (req, res) => {
  Tournament.aggregate([
    {
      $project: {
        //  $group: {
        _id: "$userId",

        totEarnings: {
          $let: {
            vars: {
              buyInCostSum: { $sum: "$buyInCost" },
              cashedForSum: { $sum: "$cashedFor" },
            },
            in: { $subtract: ["$$cashedForSum", "$$buyInCostSum"] },
          },
        },
        //  },
      },
    },
    { $sort: { totEarnings: -1 } },

    // {
    //   $addFields: {
    //     totalEarnings: { $subtract: ["$cashedForSum", "$buyInCostSum"] },
    //   },
    // },
  ])
    .limit(6)
    .then((tournaments) => res.json(tournaments));
});

module.exports = router;
