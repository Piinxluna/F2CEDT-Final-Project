function hidecode() {
	var x = document.getElementById('mainCode')
	const changeText = document.querySelector('#hideButton')
	const changeMapSize = document.getElementById('mainPart')
	if (x.style.display === 'none') {
		x.style.display = 'block'
		changeText.textContent = 'hide'
		changeText.style.color = '#fbf7f8'
		changeMapSize.style.width = '65%'
		document.getElementById('runCodeButton').style.display = 'none'
	} else {
		x.style.display = 'none'
		changeText.textContent = 'show'
		changeText.style.color = '#211217'
		changeMapSize.style.width = '100%'
		document.getElementById('runCodeButton').style.display = 'block'
	}
}

// เปิดหน้า hint
function openCenterModal1() {
	var centerModal1 = document.getElementById('centerModal1')
	centerModal1.style.display = 'block'
}

// ปิดหน้า hint
function closeCenterModal1() {
	var centerModal1 = document.getElementById('centerModal1')
	centerModal1.style.display = 'none'
}

// เปิดหน้า ?
function openCenterModal2() {
	var centerModal2 = document.getElementById('centerModal2')
	centerModal2.style.display = 'block'
}

// ปิดหน้า ?
function closeCenterModal2() {
	var centerModal2 = document.getElementById('centerModal2')
	centerModal2.style.display = 'none'
}

window.onload = function () {
	closeCenterModal1()
	closeCenterModal2()
}

function checkFor(object) {
	if (object.value == 'for') {
		let codeFor = document.getElementById(
			object.id.slice(0, 9) + 'div-' + object.id.slice(9)
		)
		let infor = document.createElement('div')
		infor.innerHTML = `
          <label class="for-inform">int i = </label>
          <input type="text" class="for-i"></input>
          <label class="for-inform">; i </label>
          <input type="text" class="for-i"></input>
          <label class="for-inform">; i </label>
		  <select class="dropdown-select">
		  <option value="++" class="dropdown-choice"> ++ </option>
		  <option value="--" class="dropdown-choice"> -- </option>
		  </select>`
		codeFor.appendChild(infor)
		let inForCode = document.createElement('div')
		inForCode.innerHTML = `<p> { </p>
		<div id="for-code-input-${object.id.slice(9)}">
		<div id="for-1-movement-div-1">
      	<label for="for-1-movement-1" class="order-dropdown"> 1 : </label>
      	<select id="for-1-movement-1" class="dropdown-select">
        	<option disabled>-Choose Option-</option>
        	<option value="walk" class="dropdown-choice">walk()</option>
        	<option value="jump" class="dropdown-choice">jump()</option>
        	<option value="turn left" class="dropdown-choice">turn left()</option>
       		<option value="turn right" class="dropdown-choice">turn right()</option>
      	</select>
    	</div>
		</div>
		<button id="add-for-input-button-${object.id.slice(
			9
		)}" class="fillButton add-del-button" onclick="addForInput(this)">add</button>
      	<button id="delete-for-input-button-${object.id.slice(
					9
				)}" class="fillButton add-del-button">delete</button>
		<p> } </p>`
		codeFor.appendChild(inForCode)
	}
}

function addForInput(object) {
	const codeInput = document.getElementById(
		`for-code-input-${object.id.slice(21)}`
	)
	const codeGuide = require('./getCodeGuide')
	if (codeInput.children.length > 5) {
		alert('เพิ่มโค้ดเต็มจำนวนแล้ว!')
	} else {
		let inputInd = codeInput.children.length
		const newdropdown = document.createElement('div')
		let optionHTML = `<h6 class="space"></h6>`
		optionHTML += `<label for="movement-${inputInd}" class="order-dropdown"> ${inputInd} : </label>`
		optionHTML += `<select id="movement-${inputInd}" class="dropdown-select">
    <option disabled>-Choose Option-</option>`
		for (let option of codeGuide.choice) {
			optionHTML += `<option value="${option}" class="dropdown-choice">${option}()</option>`
		}
		optionHTML += `</select>`
		newdropdown.innerHTML = optionHTML
		newdropdown.setAttribute('id', `movement-div-${inputInd}`)
		codeInput.appendChild(newdropdown)
	}
}
