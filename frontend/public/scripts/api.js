// This is api
import { BACKEND_URL } from "./config.js";

/** @typedef {import("./config.js").Level} Level */

export async function callGetNewLevelAPI(levelNumber) {
  /** @type {Level[]} */
  const newLevel = await fetch(
    `${BACKEND_URL}/getNewLevel/${levelNumber}`
  ).then((r) => r.json());

  return newLevel;
}
