function hidecode() {
  var x = document.getElementById("mainCode");
  const changeText = document.querySelector("#hideButton");
  const changeMapSize = document.getElementById("mainPart");
  var mapCenter = document.getElementsByClassName("centerimg");
  var runCode = document.getElementsByClassName("borderButton");
  if (x.style.display === "none") {
    x.style.display = "block";
    changeText.textContent = "hide";
    changeText.style.color = "#fbf7f8";
    changeMapSize.style.width = "65%";
    for (let i = 0; i < mapCenter.length; ++i) {
      mapCenter[i].style.width = "50%";
    }
    for (let i = 0; i < runCode.length; ++i) {
      runCode[i].style.bottom = "5%";
    }
  } else {
    x.style.display = "none";
    changeText.textContent = "show";
    changeText.style.color = "#211217";
    changeMapSize.style.width = "100%";
    for (let i = 0; i < mapCenter.length; ++i) {
      mapCenter[i].style.width = "40%";
    }
    for (let i = 0; i < runCode.length; ++i) {
      runCode[i].style.bottom = "11%";
    }
  }
}

// เปิดหน้า hint
function openCenterModal1() {
  var centerModal1 = document.getElementById("centerModal1");
  centerModal1.style.display = "block";
}

// ปิดหน้า hint
function closeCenterModal1() {
  var centerModal1 = document.getElementById("centerModal1");
  centerModal1.style.display = "none";
}

// เปิดหน้า ?
function openCenterModal2() {
  var centerModal2 = document.getElementById("centerModal2");
  centerModal2.style.display = "block";
}

// ปิดหน้า ?
function closeCenterModal2() {
  var centerModal2 = document.getElementById("centerModal2");
  centerModal2.style.display = "none";
}

window.onload = function () {
  closeCenterModal1();
  closeCenterModal2();
};

function addInputLine() {
  const codeInput = document.getElementById("code-input");
  const newdropdown = document.createElement("div");
  newdropdown.innerHTML = `
    <h6 class="space"></h6>
    <label for="movement" class="order-dropdown"> 1 : </label>
    <select id="movement-choice" class="dropdown-select">
    <option disabled>-Choose Option-</option>
    <option value="Walk" class="dropdown-choice">Walk()</option>
    <option value="Jump" class="dropdown-choice">Jump()</option>
    <option value="Turn left" class="dropdown-choice">Turn left()</option>
    <option value="Turn right" class="dropdown-choice">Turn right()</option>
    </select>`;
  codeInput.appendChild(newdropdown);
}
