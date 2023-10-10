import Levels from "../models/levelModel.js";

/** @type {import("express").RequestHandler} */
export const getLevel = async (req, res) => {
  const newLevel = await Levels.findOne({
    levelNumber: Number(req.params.id) + 1,
  });

  res.status(200).json(newLevel);
};
