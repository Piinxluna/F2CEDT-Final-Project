// This is api
import { BACKEND_URL } from "./config.js";

/** @typedef {import("./config.js").Level} Level */

// Level number is old level
export async function callGetNewLevelAPI(levelNumber) {
  // /** @type {Level[]} */
  // const newLevel = await fetch(
  //   `${BACKEND_URL}/getNewLevel/${levelNumber}`
  // ).then((r) => r.json());
  // console.log(newLevel[0]);
  // return newLevel[0];

  // for test only
  return {
    levelNumber: 1,
    mapFile: "./src/map_level1.png",
    mapArray: [
      ["-", "-", "-", "-", "-"],
      ["-", "-", "r", "-", "-"],
      ["-", "-", "x", "-", "r"],
      ["-", "-", "x", "r", "-"],
      ["-", "r", "x", "x", "-"],
    ],
    momDuckStartPos: [4, 4],
    babyDuckPos: [
      [1, 3],
      [3, 0],
      [1, 1],
    ],
    goalPos: [4, 0],
    codeGuide: {
      choice: ["walk()", "jump()", "turnLeft()", "turnRight()"],
      codeLimit: 20,
      forLimit: 0,
    },
    hint: "Test",
    momDuckStartDir: 1,
  };
}
