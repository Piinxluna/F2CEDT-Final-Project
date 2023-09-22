import { runCode, showNewLevel } from "./codeExecution.js";

document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLButtonElement} */
  const runCodeButton = document.getElementById("runCodeButton");
  runCodeButton.addEventListener("click", () => {
    showNewLevel(0);
    runCode();
  });
  const addInputButton = document.getElementById("add-input-button");
  addInputButton.addEventListener("click", () => {
    addInputLine();
  });
});
