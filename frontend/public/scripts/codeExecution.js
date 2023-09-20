import { callGetNewLevelAPI } from "./api.js";
import { displayPos } from "./duckMove.js";
/** @typedef {import("./config.js").Level} Level */

var exampleCodeLists = ["Walk", "Walk", "Turn left"];
// For test only -> The final version should get arrays from codeInput field, then make it into array within runCode() and pass it to calcResult()
var dir = 0; // 1 = Up, -1 = Down, 2 = Left, -2 = Right
var goal = [0, 0];
var pos = [0, 0];

export async function runCode() {
  /* code here */
  var codeLists = exampleCodeLists;

  var result = await calcResult(codeLists);
  showLevelStar(result.babyCollected);
  if (result.errorRes != null) {
    // Show error message
  }
  if (result.isPass === true) {
    // Show 'go to next level' ui
  }
}

export async function calcResult() {
  var babyCollected = 0;
  var errorWalk = 0;
  var isPass = false;
  var isError = false;
  var errorRes = null;
  for (data in codeLists) {
    if (pos[0] == goal[0] && pos[1] == goal[1]) {
      // Walk to finish point
      isPass = true;
      break;
    } else if (errorWalk > 3) {
      errorRes = "Error walk";
      break;
    }

    if (data == "Walk") {
    } else if (data == "Jump") {
    } else if (data == "Turn left") {
    } else if (data == "Turn right") {
    } else if (data.slice(0, 3) == "For") {
    }

    // Check baby -> babyCollected++
    // If can't walk -> errorWalk++ -> reset every time after can walk
  }
  return { errorRes, isPass, babyCollected };
}

export async function showNewLevel(levelNumber) {

  let newLev = await callGetNewLevelAPI(levelNumber);

  //change level number
  document.getElementById("levelNum").textContent = `Level ${nextLevel.levelNumber}`;

  //change mapfile
  document.getElementById("mapLevel").src = `${nextLevel.mapfile}`;

  //change map array
  //change mom duck position
  //change baby duck position
  //change goal position

  //change code guide
  document.getElementById("helpContent").textContent = `${nextLevel.codeGuide}`;

  //change hint
  document.getElementById("hintContent").textContent = `${nextLevel.hint}`;

  var mapSize = document.getElementById("map-background").clientWidth;
  var blockSize = mapSize / newLev.mapArray.length;
  var duckPic = document.getElementById("mom-duck-pic");
  duckPic.height = blockSize;
  duckPic.width = blockSize;
  pos[0] = newLev.momDuckStartPos[0] * blockSize;
  pos[1] = newLev.momDuckStartPos[1] * blockSize;
  displayPos(duckPic, pos, blockSize);

  dir = newLev.momDuckStartDir;
  goal[0] = newLev.goal[0];
  goal[1] = newLev.goal[1];
  // Call function show code input
}

export async function showLevelStar(levelScore) {
  const star1 = document.getElementById("star1");
  const star2 = document.getElementById("star2");
  const star3 = document.getElementById("star3");
  if (levelScore === 1) {
    star1.style.display = "inline-block";
    star2.style.display = "none";
    star3.style.display = "none";
  } else if (levelScore === 2) {
    star1.style.display = "inline-block";
    star2.style.display = "inline-block";
    star3.style.display = "none";
  } else if (levelScore === 3) {
    star1.style.display = "inline-block";
    star2.style.display = "inline-block";
    star3.style.display = "inline-block";
  } else if (levelScore === 0) {
    star1.style.display = "none";
    star2.style.display = "none";
    star3.style.display = "none";
  }
}

export async function toFinalPage(levelScore) {
  const finPage = document.getElementById("gameOver");
  finPage.style.display = "block";

  const winPage = document.getElementById("win");
  const losePage = document.getElementById("lose");
  // let thisLevel = callGetNewLevelAPI(levelNumber);
  if(levelScore===0) {
    winPage.style.display = "none";
    losePage.style.display = "block";
  } else {
    winPage.style.display = "block";
    losePage.style.display = "none";
  }
}