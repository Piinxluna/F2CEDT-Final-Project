import express from "express";

import * as levelController from "../controllers/levelController.js";

const router = express.Router();

router.get("/:id", levelController.getItems);

export default router;
