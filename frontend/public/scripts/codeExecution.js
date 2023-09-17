import { callGetNewLevelAPI } from "./api.js";
/** @typedef {import("./config.js").Level} Level */

export async function runCode() {
  /* code here */
}

export async function calcResult() {
  /* code here */
}

export async function showNewLevel(levelNumber) {
  //console.log(levelNumber + "Is run");

  const newLev = callGetNewLevelAPI(levelNumber);

  showLevelStar(0);

  const levelChange = document.getElementById("levelNum");
  levelChange.textContent = `level ${newLev.levelNumber}`;

  const hintChange = document.getElementById("hintContent");
  hintChange.textContent = `${newLev.hint}`;

}

export async function showLevelStar(levelScore) {
  const star1 = document.getElementById("star1");
  const star2 = document.getElementById("star2");
  const star3 = document.getElementById("star3");
  if(levelScore === 1) {
    star1.style.display = "inline-block";
    star2.style.display = "none";
    star3.style.display = "none";
  } else if(levelScore === 2) {
    star1.style.display = "inline-block";
    star2.style.display = "inline-block";
    star3.style.display = "none";
  } else if(levelScore === 3) {
    star1.style.display = "inline-block";
    star2.style.display = "inline-block";
    star3.style.display = "inline-block";
  } else if(levelScore === 0) {
    star1.style.display = "none";
    star2.style.display = "none";
    star3.style.display = "none";
  }
}