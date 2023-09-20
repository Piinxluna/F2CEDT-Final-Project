import { runCode, showNewLevel } from "./codeExecution.js";

showNewLevel(0);

document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLButtonElement} */
  const testButton = document.getElementById("runCodeButton");
  testButton.addEventListener("click", () => {
    let levelNum = document.getElementById("levelNum").innerText;
    levelNum = levelNum.slice(6);
    showNewLevel(levelNum);
  });

  const runCodeButton = document.getElementById("runCodeButton");
  runCodeButton.addEventListener("click", () => {
    runCode();
  });
  const addInputButton = document.getElementById("add-input-button");
  addInputButton.addEventListener("click", () => {
    console.log("Hi");
    addInputLine();
  });
});
