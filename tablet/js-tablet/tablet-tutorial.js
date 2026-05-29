"use strict";
// Hjem-knap: går til forsiden (index.html)
const homeBtn = document.getElementById("homeIcon");
if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// Tilbage-knap: går et skridt tilbage i browserhistorikken (som at trykke på browserens tilbage-knap)
// tjek lige om virker senere
const backBtn = document.getElementById("backIcon");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}

// Forstået-knap: går til forsiden (samme som Hjem)
const understoodBtn = document.getElementById("understoodBtn");
if (understoodBtn) {
  understoodBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
