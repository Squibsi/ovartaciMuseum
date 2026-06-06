"use strict";

// =====================================================================================================
// Start animation med lyd ved pageLoad og derefter remove af layers
//======================================================================================================
//når animationen når til det sidste lag, spilles en lyd og derefter fjernes disse lag. animationend reagere på animationen er færdig. Else er en backup, skulle animationen ikke udløse så fjerner lagene sig alligevel, så de ikke står i vejen for brugeren.
const transitionSound = new Audio("../sounds/magic-transition.mp3");
const lastCutLayer = document.getElementById("revealLayerCut3");
if (lastCutLayer) {
  transitionSound.play();
  lastCutLayer.addEventListener("animationend", () => {
    document.querySelectorAll(".reveal-layer").forEach((layer) => {
      layer.remove();
    });
  });
} else {
  // backup
  setTimeout(() => {
    document.querySelectorAll(".reveal-layer").forEach((layer) => {
      layer.remove();
    });
  }, 3200);
}

// =====================================================================================================
// Knapper
//======================================================================================================
//hjem
const homeBtn = document.getElementById("homeIcon");
if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    window.location.href = "mainpage.html";
  });
}

// =====================================================================================================
// overlays
//======================================================================================================
// jeg har lavet en lidt nem løsning hvor der er en lytter på vær enkel figur der åbner tilhørende overlay, det er ikke den mest optimeret måde at gøre det på, men den mest overskuelige at skulle kunne forstå.

// ------------- Figur 1 og overlay 1 ------------- //
// kalder elementer fra Dom
const figure1 = document.getElementById("figure1Hitboks");
const overlay1 = document.getElementById("hiddenFigure1");
const closeBtn1 = overlay1 ? overlay1.querySelector(".closeBtn") : null;
// Giver en lyd til maleri 1
const painting1Audio = new Audio("../sounds/lyd-til-painting1.m4a");
// lyttere efter klik på figur og luk knap og baggrund for overlay, samt stop lyd ved luk
if (figure1 && overlay1) {
  figure1.addEventListener("click", () => {
    //her ændres css fra none til flex, så overlay er synligt
    overlay1.style.display = "flex";
    painting1Audio.play();
  });
  if (closeBtn1) {
    closeBtn1.addEventListener("click", () => {
      overlay1.style.display = "none";
      if (painting1Audio) {
        // pause stopper lyden, hvis man trykker kryds
        painting1Audio.pause();
        // nustiller lyden, så den starter forfra, næste gang man klikker ind igen
        painting1Audio.currentTime = 0;
      }
    });
  }
  // Luk ved klik på baggrund, så man ikke behøver krydset, hvis man ikke ønsker det
  overlay1.addEventListener("click", (event) => {
    if (event.target === overlay1) {
      // går tilbage til at være hidden
      overlay1.style.display = "none";
      if (painting1Audio) {
        painting1Audio.pause();
        painting1Audio.currentTime = 0;
      }
    }
  });
}

// ------------- Figur 2 og overlay 2 ------------- //
const figure2 = document.getElementById("figure2Hitboks");
const overlay2 = document.getElementById("hiddenFigure2");
const closeBtn2 = overlay2 ? overlay2.querySelector(".closeBtn") : null;
const painting2Audio = new Audio("../sounds/lyd-til-painting2.m4a");

if (figure2 && overlay2) {
  figure2.addEventListener("click", () => {
    overlay2.style.display = "flex";
    painting2Audio.play();
  });
  if (closeBtn2) {
    closeBtn2.addEventListener("click", () => {
      overlay2.style.display = "none";
      if (painting2Audio) {
        painting2Audio.pause();
        painting2Audio.currentTime = 0;
      }
    });
  }
  overlay2.addEventListener("click", (event) => {
    if (event.target === overlay2) {
      overlay2.style.display = "none";
      if (painting2Audio) {
        painting2Audio.pause();
        painting2Audio.currentTime = 0;
      }
    }
  });
}

// ------------- Figur 3 og overlay 3 ------------- //
const figure3 = document.getElementById("figure3Hitboks");
const overlay3 = document.getElementById("hiddenFigure3");
const closeBtn3 = overlay3 ? overlay3.querySelector(".closeBtn") : null; //hedder bare 3 for ikke at have den samme const
const painting3Audio = new Audio("../sounds/lyd-til-painting3.m4a");

if (figure3 && overlay3) {
  figure3.addEventListener("click", () => {
    overlay3.style.display = "flex";
    painting3Audio.play();
  });
  if (closeBtn3) {
    closeBtn3.addEventListener("click", () => {
      overlay3.style.display = "none";
      if (painting3Audio) {
        painting3Audio.pause();
        painting3Audio.currentTime = 0;
      }
    });
  }
  overlay3.addEventListener("click", (event) => {
    if (event.target === overlay3) {
      overlay3.style.display = "none";
      if (painting3Audio) {
        painting3Audio.pause();
        painting3Audio.currentTime = 0;
      }
    }
  });
}
