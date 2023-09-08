import Levels from "../models/levelModel.js";

/** @type {import("express").RequestHandler} */
export const getLevel = async (req, res) => {
  const newLevel = await Levels.find({ levelNumber: req.params.id + 1 });

  res.status(200).json(newLevel);
};

// /** @type {import("express").RequestHandler} */
// export const getAllLevels = async (req, res) => {
//   const levels = await Levels.find();

//   res.status(200).json(levels);
// };
