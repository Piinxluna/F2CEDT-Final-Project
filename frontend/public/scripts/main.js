import {
	runCode,
	showNewLevel,
	showOldLevel,
	addInputLine,
	deleteInputLine,
	postScore,
} from './codeExecution.js'

import { showLeaderboard } from './leaderboardTable.js'

showNewLevel(1)

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
	playAgainButton1.addEventListener('click', () => {
		const finPage = document.getElementById('gameOver')
		finPage.style.display = 'none'
		showOldLevel()
	})
	const playAgainButton2 = document.getElementById('play-again-button-lose')
	playAgainButton2.addEventListener('click', () => {
		const finPage = document.getElementById('gameOver')
		finPage.style.display = 'none'
		showOldLevel()
	})

	const nextLevelButton = document.getElementById('next-level-button')
	nextLevelButton.addEventListener('click', () => {
		let levelNum = document.getElementById('levelNum').innerText
		levelNum = levelNum.slice(6)
		const finPage = document.getElementById('gameOver')
		finPage.style.display = 'none'
		showNewLevel(levelNum)
	})

	const submitButton = document.getElementById('submitButton')
	submitButton.addEventListener('click', function () {
		var name = document.getElementById('name').value
		if (name) {
			postScore(name)
		} else {
			alert('กรอกชื่อก่อนนะจ้ะ')
		}
	})
	const leaderboardButton = document.getElementById('checkleader')
	leaderboardButton.addEventListener('click', () => {
		let levelNum = document.getElementById('levelNum').innerText
		levelNum = levelNum.slice(6)
		showLeaderboard(levelNum)
	})

	closeCenterModal1()
	closeCenterModal2()
	closeCenterModal4()
})

// ปิดหน้า hint
function closeCenterModal1() {
	var centerModal1 = document.getElementById('centerModal1')
	centerModal1.style.display = 'none'
}

// ปิดหน้า ?
function closeCenterModal2() {
	var centerModal2 = document.getElementById('centerModal2')
	centerModal2.style.display = 'none'
}

// ปิดหน้า leaderboard
function closeCenterModal4() {
	var centerModal4 = document.getElementById('centerModal4')
	centerModal4.style.display = 'none'
}
