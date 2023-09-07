/** @type {import("express").RequestHandler} */
export const getLevel = async (req, res) => {
  const newLevel = await Item.find({ level: req.params.id });

  res.status(200).json(newLevel);
};
