"use strict";
// ------------- knappper ------------- //
//hjem
const homeBtn = document.getElementById("homeIcon");
if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    window.location.href = "mainpage.html";
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
