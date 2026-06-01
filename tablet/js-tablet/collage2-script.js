"use strict";
// ------------- start animation ------------- //
// denne er med til at fjerne reveal-layer når animationen er færdig
const maxDelay = 3.2; // sekunder (2.7s + 0.5s buffer)
setTimeout(() => {
  document.querySelectorAll(".reveal-layer").forEach((layer) => {
    layer.remove();
  });
}, maxDelay * 1000);

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

// jeg har lavet en lidt nem løsning hvor der er en lytter på vær enkel figur der åbner tilhørende overlay, det er ikke den mest optimeret måde at gøre det på, men den mest overskuelige at skulle kunne forstå.

// ------------- Figur 1 og overlay 1 ------------- //
const figure1 = document.getElementById("figure1Hitboks");
const overlay1 = document.getElementById("hiddenFigure1");
const closeBtn1 = overlay1 ? overlay1.querySelector(".closeBtn") : null;

if (figure1 && overlay1) {
  figure1.addEventListener("click", () => {
    overlay1.style.display = "flex";
  });
  if (closeBtn1) {
    closeBtn1.addEventListener("click", () => {
      overlay1.style.display = "none";
    });
  }
  // Luk ved klik på baggrund
  overlay1.addEventListener("click", (event) => {
    if (event.target === overlay1) {
      overlay1.style.display = "none";
    }
  });
}

// ------------- Figur 2 og overlay 2 ------------- //
const figure2 = document.getElementById("figure2Hitboks");
const overlay2 = document.getElementById("hiddenFigure2");
const closeBtn2 = overlay2 ? overlay2.querySelector(".closeBtn") : null;

if (figure2 && overlay2) {
  figure2.addEventListener("click", () => {
    overlay2.style.display = "flex";
  });
  if (closeBtn2) {
    closeBtn2.addEventListener("click", () => {
      overlay2.style.display = "none";
    });
  }
  overlay2.addEventListener("click", (event) => {
    if (event.target === overlay2) {
      overlay2.style.display = "none";
    }
  });
}

// ------------- Figur 3 og overlay 3 ------------- //
const figure3 = document.getElementById("figure3Hitboks");
const overlay3 = document.getElementById("hiddenFigure3");
const closeBtn3 = overlay3 ? overlay3.querySelector(".closeBtn") : null; //hedder bare 3 for ikke at have den samme const

if (figure3 && overlay3) {
  figure3.addEventListener("click", () => {
    overlay3.style.display = "flex";
  });
  if (closeBtn3) {
    closeBtn3.addEventListener("click", () => {
      overlay3.style.display = "none";
    });
  }
  overlay3.addEventListener("click", (event) => {
    if (event.target === overlay3) {
      overlay3.style.display = "none";
    }
  });
}
