import { runCode, showNewLevel } from "./codeExecution.js";

showNewLevel(0);

document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLButtonElement} */
  const addButton = document.getElementById("runCodeButton");
  addButton.addEventListener("click", () => {
    let levelNum = document.getElementById("levelNum").innerText;
    levelNum = levelNum.slice(5);
    // console.log(levelNum);
    showNewLevel(levelNum);
    runCode();
  });
});
