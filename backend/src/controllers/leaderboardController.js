import Leaderboard from "../models/leaderboardModel.js";

/** @type {import("express").RequestHandler} */
export const postNewScore = async (req, res) => {
  const name = req.body.name;
  const oldData = await Leaderboard.findOne({
    name: name,
    levelNum: req.body.levelNum,
  });
  if (oldData == null) {
    const newScore = new Leaderboard(req.body);
    await newScore.save();
    res.status(200).json({ message: "OK" });
  } else {
    console.log("found");
    if (req.body.star > oldData.star) {
      await Leaderboard.findOneAndUpdate({ name: name }, req.body);
    } else if (
      oldData.star == req.body.star &&
      req.body.inputNum < oldData.inputNum
    ) {
      await Leaderboard.findOneAndUpdate({ name: name }, req.body);
    }

    res.status(200).json({ message: "OK" });
  }
};

/** @type {import("express").RequestHandler} */
export const getLeaderboard = async (req, res) => {
  const leaderboard = await Leaderboard.find({
    levelNum: Number(req.params.level),
  }).sort({
    star: -1,
    inputNum: 1,
    updatedAt: 1,
  });
  res.status(200).json(leaderboard);
};
