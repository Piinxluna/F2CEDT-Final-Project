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
	exportedCodeGuide += `], forLimit: 5 }`
	let forId = object.id.slice(9)

	if (object.value == 'for') {
		let codeFor = document.getElementById(
			object.id.slice(0, 9) + 'div-' + forId
		)
		let forDetail = document.createElement('div')
		forDetail.innerHTML = `<div class="in-for">
      <label class="for-informm">int i = 0; i < </label>
      <label><input type="text" class="for-i" id="condition-value-${forId}"></label>
      <label class="for-informm">; i++</label>
		</div>`
		forDetail.innerHTML += `<div id="for-code-input">
		<p> { </p>
		<div id="for-code-input-${forId}">
			<div id="for-${forId}-movement-div-1">
      	<label for="for-${forId}-movement-1" class="order-dropdown"> 1 : </label>
      	<label><select id="for-${forId}-movement-1" class="dropdown-select">
        	<option disabled>-Choose Option-</option>
        	<option value="walk" class="dropdown-choice">walk()</option>
        	<option value="jump" class="dropdown-choice">jump()</option>
        	<option value="turn left" class="dropdown-choice">turn left()</option>
       		<option value="turn right" class="dropdown-choice">turn right()</option>
      	</select></label>
    	</div>
		</div>
		<button id="add-for-input-button-${forId}" class="fillButton add-del-button" onclick="addForInput(this,${exportedCodeGuide})">add</button>
    <button id="delete-for-input-button-${forId}" class="fillButton add-del-button" onclick="deleteForInput(this)">delete</button>
		<p> } </p>
		</div>`
		forDetail.setAttribute('id', `for-detail-div-${forId}`)
		codeFor.appendChild(forDetail)
	} else if (document.getElementById(`for-detail-div-${forId}`) !== null) {
		document.getElementById(`for-detail-div-${forId}`).remove()
	}
}

function addForInput(object, codeGuide) {
	let forId = object.id.slice(21)
	const codeInput = document.getElementById(`for-code-input-${forId}`)
	if (codeInput.children.length > codeGuide.forLimit - 1) {
		alert('เพิ่มโค้ดของ for เต็มจำนวนแล้ว!')
	} else {
		let inputInd = codeInput.children.length + 1
		const newdropdown = document.createElement('div')
		let optionHTML = `<label for="for-${forId}-movement-${inputInd}" class="order-dropdown"> ${inputInd} : </label>`
		optionHTML += `<select id="for-${forId}-movement-${inputInd}" class="dropdown-select">
	  <option disabled>-Choose Option-</option>`
		for (let option of codeGuide.choice) {
			optionHTML += `<option value="${option}" class="dropdown-choice">${option}()</option>`
		}
		optionHTML += `</select>`
		newdropdown.innerHTML = optionHTML
		newdropdown.setAttribute('id', `for-${forId}-movement-div-${inputInd}`)
		codeInput.appendChild(newdropdown)
	}
}

function deleteForInput(object) {
	let forId = object.id.slice(24)
	const forNoInnerId = document.getElementById(`for-code-input-${forId}`)
	let numFor = forNoInnerId.children.length
	if (numFor > 1) {
		let lastForLine = document.getElementById(
			`for-${forId}-movement-div-${numFor}`
		)
		lastForLine.remove()
	}
}
