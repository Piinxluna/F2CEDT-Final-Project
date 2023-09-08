function hidecode() {
    var x = document.getElementById("mainCode");
    const changeText = document.querySelector("#hideButton");
    const changeMapSize = document.getElementById("mainPart");
    if (x.style.display === "none") {
      x.style.display = "block";
      changeText.textContent = "hide";
      changeText.style.color = "#fbf7f8";
      changeMapSize.style.width = "65%";
    } else {
      x.style.display = "none";
      changeText.textContent = "show";
      changeText.style.color = "#211217";
      changeMapSize.style.width = "100%";
    }
}

