import { runCode, showNewLevel } from "./codeExecution.js";

showNewLevel(0);

document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLButtonElement} */
  const runCodeButton = document.getElementById("runCodeButton");
  runCodeButton.addEventListener("click", () => {
    let levelNum = document.getElementById("levelNum").innerText;
    levelNum = levelNum.slice(5);
    // console.log(levelNum);
    showNewLevel(levelNum);
    runCode();
  });
  const addInputButton = document.getElementById("add-input-button");
  addInputButton.addEventListener("click", () => {
    console.log("Hi")
    addInputLine();
  });
});
