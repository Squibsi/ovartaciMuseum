"use strict";
// =====================================================================================================
// Knapper
//======================================================================================================
// Hjem-knap: går til forsiden (index.html)
const homeBtn = document.getElementById("homeIcon");
if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// Forstået-knap: går til forsiden (samme som Hjem)
const understoodBtn = document.getElementById("understoodBtn");
if (understoodBtn) {
  understoodBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
