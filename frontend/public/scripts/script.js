// function hidecode() {
// 	var x = document.getElementById('mainCode')
// 	const changeText = document.querySelector('#hideButton')
// 	const changeMapSize = document.getElementById('mainPart')
// 	if (x.style.display === 'none') {
// 		x.style.display = 'block'
// 		changeText.textContent = 'hide'
// 		changeText.style.color = '#fbf7f8'
// 		changeMapSize.style.width = '65%'
// 		document.getElementById('runCodeButton').style.display = 'none'
// 	} else {
// 		x.style.display = 'none'
// 		changeText.textContent = 'show'
// 		changeText.style.color = '#211217'
// 		changeMapSize.style.width = '100%'
// 		document.getElementById('runCodeButton').style.display = 'block'
// 	}
// }

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

function checkFor(object, codeGuide) {
	let exportedCodeGuide = `{ choice: ['${codeGuide.choice[0]}'`
	for (let i = 1; i < codeGuide.choice.length; i++) {
		exportedCodeGuide += `, '${codeGuide.choice[i]}'`
	}
	exportedCodeGuide += `], forLimit: ${codeGuide.forLimit}, forNum: ${codeGuide.forNum} }`
	let forId = object.id.slice(9)

	if (object.value == 'for') {
		let codeFor = document.getElementById('movement-div-' + forId)
		let forDetail = document.createElement('div')
		forDetail.innerHTML = `<div>
      <label class="for-informm">int i = 0; i < </label>
      <input type="text" class="for-i" id="condition-value-${forId}">
      <label class="for-informm">; i++</label>
		</div>`
		forDetail.innerHTML += `<div>
		<p> { </p>
		<div id="for-code-input-${forId}">
		</div>
		<button id="add-for-input-button-${forId}" class="fillButton add-del-button" onclick="addForInput(this,${exportedCodeGuide})">add</button>
    <button id="delete-for-input-button-${forId}" class="fillButton add-del-button" onclick="deleteForInputLine(this)">delete</button>
		<p> } </p>
		</div>`
		forDetail.setAttribute('id', `for-detail-div-${forId}`)
		codeFor.appendChild(forDetail)
		// addForInput({ id: `add-for-input-button-${forId}` }, exportedCodeGuide)
	} else if (document.getElementById(`for-detail-div-${forId}`) !== null) {
		console.log('is removed!')
		document.getElementById(`for-detail-div-${forId}`).remove()
	}
}

function addForInput(object, codeGuide) {
	let exportedCodeGuide = `{ choice: ['${codeGuide.choice[0]}'`
	for (let i = 1; i < codeGuide.choice.length; i++) {
		exportedCodeGuide += `, '${codeGuide.choice[i]}'`
	}
	exportedCodeGuide += `], forLimit: ${codeGuide.forLimit}, forNum: ${codeGuide.forNum} }`

	let forId = object === 1 ? object : object.id.slice(21)
	const codeInput = document.getElementById(`for-code-input-${forId}`)
	if (codeInput.children.length > codeGuide.forLimit - 1) {
		alert('เพิ่มโค้ดของ for เต็มจำนวนแล้ว!')
	} else {
		let inputInd = codeInput.children.length + 1
		const newdropdown = document.createElement('div')
		let optionHTML = `<label for="for-${forId}-movement-${inputInd}" class="order-dropdown"> ${inputInd} : </label>`
		optionHTML += `<select id="for-${forId}-movement-${inputInd}" class="dropdown-select" onchange="checkFor2(this,${exportedCodeGuide})">
	  <option disabled>-Choose Option-</option>`
		for (let option of codeGuide.choice) {
			if (option == 'for' && codeGuide.forNum <= 1) continue
			optionHTML += `<option value="${option}" class="dropdown-choice">${option}()</option>`
		}
		optionHTML += `</select>`
		newdropdown.innerHTML = optionHTML
		newdropdown.setAttribute('id', `for-${forId}-movement-div-${inputInd}`)
		codeInput.appendChild(newdropdown)
	}
}

function deleteForInputLine(object) {
	// let inputInd =
	if (inputInd > 1) {
		let lastLine = document.getElementById(`for-code-input-${inputInd}`)
		lastLine.remove()
		inputInd--
	}
}

function checkFor2(object, codeGuide) {
	let exportedCodeGuide = `{ choice: ['${codeGuide.choice[0]}'`
	for (let i = 1; i < codeGuide.choice.length; i++) {
		exportedCodeGuide += `, '${codeGuide.choice[i]}'`
	}
	exportedCodeGuide += `], forLimit: ${codeGuide.forLimit}, forNum: ${codeGuide.forNum} }`
	let forId = object.id.slice(
		findIndex(object.id, '-', 1) + 1,
		findIndex(object.id, '-', 2)
	)
	let inputInd = object.id.slice(findIndex(object.id, '-', 3) + 1)
	console.log(forId, inputInd)

	if (object.value == 'for') {
		let codeFor = document.getElementById(
			`for-${forId}-movement-div-${inputInd}`
		)
		let forDetail = document.createElement('div')
		forDetail.innerHTML = `<div>
      <label class="for-informm">int j = 0; j < </label>
      <input type="text" class="for-i" id="condition-value2-${forId}">
      <label class="for-informm">; j++</label>
		</div>`
		forDetail.innerHTML += `<div>
		<p> { </p>
		<div id="for2-code-input-${forId}-${inputInd}">
		</div>
		<button id="add-for2-input-button-${forId}-${inputInd}" class="fillButton add-del-button" onclick="addForInput2(this,${exportedCodeGuide})">add</button>
    <button id="delete-for2-input-button-${forId}-${inputInd}" class="fillButton add-del-button">delete</button>
		<p> } </p>
		</div>`
		forDetail.setAttribute('id', `for2-detail-div-${forId}-${inputInd}`)
		codeFor.appendChild(forDetail)
		// addForInput({ id: `add-for-input-button-${forId}` }, exportedCodeGuide)
	} else if (
		document.getElementById(`for2-detail-div-${forId}-${inputInd}`) !== null
	) {
		console.log('is removed!')
		document.getElementById(`for2-detail-div-${forId}-${inputInd}`).remove()
	}
}

function addForInput2(object, codeGuide) {
	let forId = object.id.slice(findIndex(object.id, '-', 4) + 1)

	const codeInput = document.getElementById(`for2-code-input-${forId}`)
	if (codeInput.children.length > codeGuide.forLimit - 1) {
		alert('เพิ่มโค้ดของ for เต็มจำนวนแล้ว!')
	} else {
		let inputInd = codeInput.children.length + 1
		const newdropdown = document.createElement('div')
		let optionHTML = `<label for="for2-${forId}-movement-${inputInd}" class="order-dropdown"> ${inputInd} : </label>`
		optionHTML += `<select id="for2-${forId}-movement-${inputInd}" class="dropdown-select">
	  <option disabled>-Choose Option-</option>`
		for (let option of codeGuide.choice) {
			if (option == 'for' && codeGuide.forNum <= 2) continue
			optionHTML += `<option value="${option}" class="dropdown-choice">${option}()</option>`
		}
		optionHTML += `</select>`
		newdropdown.innerHTML = optionHTML
		newdropdown.setAttribute('id', `for2-${forId}-movement-div-${inputInd}`)
		codeInput.appendChild(newdropdown)
	}
}

function findIndex(str, focusStr, num) {
	return str.split(focusStr, num).join(focusStr).length
}
