import { runCode, showNewLevel } from "./codeExecution.js";

document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLButtonElement} */
  const addButton = document.getElementById("runCodeButton");
  addButton.addEventListener("click", () => {
    showNewLevel(0);
    runCode();
  });
});
