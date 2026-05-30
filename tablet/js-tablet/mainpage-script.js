"use strict";

// Hjem-knap: går til forsiden (index.html)
const homeBtn = document.getElementById("homeIcon");
if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
