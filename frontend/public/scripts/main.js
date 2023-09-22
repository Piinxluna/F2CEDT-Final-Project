import {
	runCode,
	showNewLevel,
	addInputLine,
	deleteInputLine,
} from './codeExecution.js'

showNewLevel(0)

document.addEventListener('DOMContentLoaded', () => {
	/** @type {HTMLButtonElement} */
	const runCodeButton = document.getElementById('runCodeButton')
	runCodeButton.addEventListener('click', () => {
		runCode()
	})
	const addInputButton = document.getElementById('add-input-button')
	addInputButton.addEventListener('click', () => {
		addInputLine()
	})
	const delInputButton = document.getElementById('delete-input-button')
	delInputButton.addEventListener('click', () => {
		deleteInputLine()
	})

	const playAgainButton1 = document.getElementById('play-again-button-win')
	playAgainButton1.addEventListener('click', showThisLevel)
	const playAgainButton2 = document.getElementById('play-again-button-lose')
	playAgainButton2.addEventListener('click', showThisLevel)

	const nextLevelButton = document.getElementById('next-level-button')
	nextLevelButton.addEventListener('click', () => {
		let levelNum = document.getElementById('levelNum').innerText
		levelNum = levelNum.slice(6)
		const finPage = document.getElementById('gameOver')
		finPage.style.display = 'none'
		showNewLevel(levelNum)
	})
})

function showThisLevel() {
	let levelNum = document.getElementById('levelNum').innerText
	levelNum = levelNum.slice(6)
	const finPage = document.getElementById('gameOver')
	finPage.style.display = 'none'
	showNewLevel(levelNum - 1)
}
