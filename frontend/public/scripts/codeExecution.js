import { callGetNewLevelAPI } from "./api.js";
import { displayPos, hideBabyDuck, isSamePoint } from "./duckMove.js";
/** @typedef {import("./config.js").Level} Level */

// For test only -> The final version should get arrays from codeInput field, then make it into array within runCode() and pass it to calcResult()
var exampleCodeLists = [
  "Walk",
  "Jump",
  "Turn left",
  "Walk",
  "Walk",
  "Walk",
  "Walk",
  "Walk",
  "Walk",
  "Walk",
  "Walk",
  "Walk",
  "Walk",
  "Walk",
  "Jump",
  "Walk",
  "Turn left",
  "Walk",
  "Walk",
  "Walk",
];

var duckPic = document.getElementById("mom-duck-pic");
var blockSize;
var dir = 0; // 1 = Up, 2 = Right, 3 = Down, 4 = Left,
var goal = [0, 0];
var startPos = [];
var babyDuckPos = [];
var mapArray = [];

var pos = [0, 0];
var nextPos = [];

export async function runCode() {
  duckPic.height = blockSize;
  duckPic.width = blockSize;
  pos = startPos;
  await displayPos(
    duckPic,
    pos.map((x) => x * blockSize),
    blockSize
  );
  for (let i = 0; i < 3; i++) {
    let babyDuck = document.getElementById("baby-duck-pic-" + i);
    babyDuck.style.display = "block";
  }

  /* code here */
  var codeLists = exampleCodeLists;

  var result = await calcResult(codeLists);
  showStar("level", result.babyCollected);
  toFinalPage(result);
}

export async function calcResult(codeLists) {
  var babyCollected = 0;
  var errorWalk = 0;
  var isPass = false;
  var isError = false;
  var errorRes = null;
  for (let data of codeLists) {
    console.log(data, errorWalk);
    isError = false;
    if (data == "Walk") {
      nextTarget(1);
      if (getPosData(nextPos) == "-") {
        pos = nextPos;
        await displayPos(
          duckPic,
          pos.map((x) => x * blockSize),
          blockSize
        );
      } else {
        isError = true;
      }
    } else if (data == "Jump") {
      nextTarget(1);
      if (getPosData(nextPos) == "-") {
        pos = nextPos;
        await displayPos(
          duckPic,
          pos.map((x) => x * blockSize),
          blockSize
        );
      } else if (getPosData(nextPos) == "r") {
        nextTarget(2);
        pos = nextPos;
        await displayPos(
          duckPic,
          pos.map((x) => x * blockSize),
          blockSize
        );
      } else {
        isError = true;
      }
    } else if (data == "Turn left") {
      dir--;
      dir = dir == 0 ? 4 : dir;
    } else if (data == "Turn right") {
      dir++;
      dir = dir == 5 ? 1 : dir;
    } else if (data.slice(0, 3) == "For") {
    }

    for (let i in babyDuckPos) {
      if (isSamePoint(pos, babyDuckPos[i])) {
        babyCollected++;
        hideBabyDuck(babyDuckPos[i].map((x) => x * blockSize));
        babyDuckPos.splice(i, 1);
      }
    }

    // If can't walk -> errorWalk++ -> reset every time after can walk
    if (isError == true) {
      errorWalk++;
    } else {
      errorWalk = 0;
    }

    if (isSamePoint(pos, goal)) {
      // Walk to finish point
      isPass = true;
      break;
    } else if (errorWalk > 3) {
      errorRes = "เดินไปทางนั้นไม่ได้อ่ะ T^T";
      break;
    }
  }
  return { errorRes, isPass, babyCollected };

  // ---------- functions used to calcresult ----------
  function nextTarget(i) {
    if (dir == 1) {
      nextPos = [pos[0] - i, pos[1]];
    } else if (dir == 2) {
      nextPos = [pos[0], pos[1] + i];
    } else if (dir == 3) {
      nextPos = [pos[0] + i, pos[1]];
    } else if (dir == 4) {
      nextPos = [pos[0], pos[1] - i];
    }
  }

  function getPosData(pos) {
    if (
      pos[0] < 0 ||
      pos[1] < 0 ||
      pos[0] >= mapArray.length ||
      pos[1] >= mapArray.length
    ) {
      return null;
    } else {
      return mapArray[pos[0]][pos[1]];
    }
  }
}

export async function showNewLevel(levelNumber) {
  let newLev = await callGetNewLevelAPI(levelNumber);

  //change level number
  document.getElementById(
    "levelNum"
  ).textContent = `Level ${newLev.levelNumber}`;

  //change mapfile
  document.getElementById("map-background").src = `${newLev.mapFile}`;

  //change hint
  document.getElementById("hintContent").textContent = `${newLev.hint}`;

  //change map array
  mapArray = newLev.mapArray;

  var mapSize = document.getElementById("map-background").clientWidth;
  blockSize = mapSize / newLev.mapArray.length;

  //change mom duck position
  duckPic.height = blockSize;
  duckPic.width = blockSize;
  startPos = newLev.momDuckStartPos;
  pos = startPos;
  displayPos(
    duckPic,
    pos.map((x) => x * blockSize),
    blockSize
  );

  //change goal position
  dir = newLev.momDuckStartDir;
  goal[0] = newLev.goalPos[0];
  goal[1] = newLev.goalPos[1];

  //change baby duck position
  for (let i = 0; i < newLev.babyDuckPos.length; i++) {
    let babyDuck = document.getElementById("baby-duck-pic-" + i);
    babyDuck.height = blockSize;
    babyDuck.width = blockSize;
    displayPos(
      babyDuck,
      newLev.babyDuckPos[i].map((x) => x * blockSize),
      blockSize
    );
    babyDuckPos[i] = newLev.babyDuckPos[i];
  }

  // Call function show code input
}

export async function showStar(type, levelScore) {
  const star1 = document.getElementById(type + "-star1");
  const star2 = document.getElementById(type + "-star2");
  const star3 = document.getElementById(type + "-star3");
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

export async function toFinalPage(res) {
  const finPage = document.getElementById("gameOver");
  finPage.style.display = "block";

  const winPage = document.getElementById("win");
  const losePage = document.getElementById("lose");

  if (res.isPass == true) {
    winPage.style.display = "block";
    losePage.style.display = "none";
    showStar("result", res.babyCollected);
  } else {
    winPage.style.display = "none";
    losePage.style.display = "block";
    document.getElementById("error-message").innerText = res.errorRes;
  }
}
