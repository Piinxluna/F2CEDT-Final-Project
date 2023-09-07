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

