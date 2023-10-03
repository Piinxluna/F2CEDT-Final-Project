import Leaderboard from "../models/leaderboardModel.js";

/** @type {import("express").RequestHandler} */
export const postNewScore = async (req, res) => {
  const name = req.body.name;
  const isExist = await Leaderboard.exists({ name: name });
  if (isExist == null) {
    const newScore = new Leaderboard(req.body);
    await newScore.save();
    res.status(200).json({ message: "OK" });
  } else {
    const updateScore = await Leaderboard.findOneAndUpdate(
      { name: name },
      req.body
    );
    res.status(200).json({ message: "OK" });
  }
};

/** @type {import("express").RequestHandler} */
export const getLeaderboard = async (req, res) => {
  const leaderboard = await Leaderboard.find({}).sort({
    star: -1,
    inputNum: 1,
    updatedAt: 1,
  });
  res.status(200).json(leaderboard);
};
