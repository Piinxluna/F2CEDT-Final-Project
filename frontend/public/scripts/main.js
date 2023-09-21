import { runCode, showNewLevel } from "./codeExecution.js";

showNewLevel(0);

document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLButtonElement} */
  const runCodeButton = document.getElementById("runCodeButton");
  runCodeButton.addEventListener("click", () => {
    runCode();
  });
  const addInputButton = document.getElementById("add-input-button");
  addInputButton.addEventListener("click", () => {
    addInputLine();
  });
});
