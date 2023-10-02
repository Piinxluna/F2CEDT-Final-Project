import express from "express";

import * as leaderboardController from "../controllers/leaderboardController.js";

const router = express.Router();

router.post("/", leaderboardController.postNewScore);
router.get("/", leaderboardController.getLeaderboard);

export default router;
