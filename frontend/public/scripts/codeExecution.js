import { callGetNewLevelAPI } from "./api.js";
/** @typedef {import("./config.js").Level} Level */

export async function runCode() {
  /* code here */
}

export async function calcResult() {
  /* code here */
}

export async function showNewLevel(levelNumber) {
 
  let nextLevel = callGetNewLevelAPI(levelNumber);

  showLevelStar(0);

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
  } else if(levelScore === 0) {
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