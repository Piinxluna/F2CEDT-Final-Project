function hidecode() {
    var x = document.getElementById("code");
    const changeText = document.querySelector(".hideB");
    const changeMapSize = document.getElementById("mapLeft");
    if (x.style.display === "none") {
      x.style.display = "block";
      changeText.textContent = "hide";
    } else {
      x.style.display = "none";
      changeText.textContent = "show";

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

window.onload = function() {
  closeCenterModal1();
  closeCenterModal2();
};