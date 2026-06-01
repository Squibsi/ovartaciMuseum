"use strict";

// ----- Hent DOM-elementer -----
const brainPieces = document.querySelectorAll(".brainPiece");
const tekstParagraf = document.querySelector("#puzzleProgressText p"); // tager fat i teksten  der viser hvor mange brikker der er.
const logOutBtn = document.getElementById("logOutBtn"); // log ud knap
const updateBtn = document.getElementById("updateBtn"); // opdater knap
const homeIcon = document.getElementById("homeIcon"); // hjem ikon

// ----- Funktioner til localStorage -----
function getFoundPieces() {
  const saved = localStorage.getItem("FoundPieces");
  if (saved) {
    return JSON.parse(saved);
  }
  return []; // ingen brikker fundet endnu
}

function saveFoundPieces(pieces) {
  localStorage.setItem("FoundPieces", JSON.stringify(pieces));
}

// ----- Opdater visning af brikker og tæller -----
function updatePuzzle() {
  const found = getFoundPieces();
  const total = brainPieces.length; // = 3

  // Opdater hvert tomme brainPiece: hvis brik-id er fundet, skift til farvet billede
  brainPieces.forEach((brainPiece) => {
    const brainId = brainPiece.getAttribute("data-brain-id");
    if (found.includes(brainId)) {
      // Skift til farvet version (antaget filnavn: farvet-brik1.png, farvet-brik2.png...)
      const colorPath = `../img/filled-brain${brainId}.svg`; // gør den farvet
      if (brainPiece.src !== colorPath) {
        brainPiece.src = colorPath;
        // Tilføj fade-klasse (hvis du har CSS)
        brainPiece.classList.add("ny");
        setTimeout(() => brainPiece.classList.remove("ny"), 500);
      }
      // Gør den klikbar
      brainPiece.style.cursor = "pointer";
      // clickDealer starter animation og til korrekt collage side
      if (!brainPiece.clickDealer) {
        const dealer = () => {
          // Forhindr at der kan klikkes flere gange under animationen
          if (brainPiece.classList.contains("zoom-animation")) return;

          // Tilføj CSS-animationsklassen
          brainPiece.classList.add("zoom-animation");

          // Lyt efter når animationen er færdig
          const onAnimationEnd = () => {
            brainPiece.classList.remove("zoom-animation");
            brainPiece.removeEventListener("transitionend", onAnimationEnd);
            // Skift side efter animationen
            window.location.href = `collage${brainId}.html`;
          };
          brainPiece.addEventListener("animationend", onAnimationEnd, {
            once: true,
          });

          // Sikkerhed: Hvis animationen af en eller anden grund ikke udløses, skift alligevel efter 0,4 sek.
          setTimeout(() => {
            if (brainPiece.classList.contains("zoom-animation")) {
              brainPiece.classList.remove("zoom-animation");
              window.location.href = `collage${brainId}.html`;
            }
          }, 400);
        };
        brainPiece.addEventListener("click", dealer);
        brainPiece.clickDealer = dealer;
      }
    } else {
      // Sæt blankt billede tilbage (hvis en brik fjernes ved logout)
      let blankPath = `../img/blank-brain${brainId}.svg`; // eller brug de oprindelige stier
      // Du skal kende de oprindelige blanke stier. Her en simpel måde:
      if (brainId === "1") brainPiece.src = "../img/blank-brain1.svg";
      else if (brainId === "2") brainPiece.src = "../img/blank-brain2.svg";
      else if (brainId === "3") brainPiece.src = "../img/blank-brain3.svg";
      if (brainPiece.src !== blankPath) {
        brainPiece.src = blankPath;
      }
      // Fjern klik-funktionalitet
      brainPiece.style.cursor = "default";
      if (brainPiece.clickDealer) {
        brainPiece.removeEventListener("click", brainPiece.clickDealer);
        delete brainPiece.clickDealer; // sletter den gemte funktion
      }
    }
  });

  // Opdater tællertekst med antal fundne puslespilsbrikker
  tekstParagraf.innerText = `${found.length}/${total} fundet`;
}

// ----- Tilføj en ny brik (kaldes når QR kode scannes) -----
function addPiece(brainId) {
  let found = getFoundPieces();
  if (!found.includes(brainId)) {
    found.push(brainId);
    saveFoundPieces(found);
    updatePuzzle();
    console.log(`Brik ${brainId} tilføjet!`);
  } else {
    console.log(`Brik ${brainId} allerede fundet.`);
  }
}

// ----- Nulstil alle brikker (log ud) -----
function resetPuzzle() {
  localStorage.removeItem("FoundPieces");
  updatePuzzle();
  console.log("Spillet er nulstillet");
}

// ----- Event listeners -----

// hjem knap fører til forsiden
if (homeIcon) {
  homeIcon.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// logger person ud og starter funktionen resetPuzzle
if (logOutBtn) {
  logOutBtn.addEventListener("click", () => {
    resetPuzzle();
  });
}

// opdatering knap starter opdaterings funktionen updatePuzzle
if (updateBtn) {
  updateBtn.addEventListener("click", () => {
    updatePuzzle(); // genopfrisker visningen (fx efter manuelt at have ændret localStorage)
  });
}

// ----- Initialisering ved pageload -----
document.addEventListener("DOMContentLoaded", () => {
  updatePuzzle();
});

// Gør addPiece global, så den kan kaldes fra konsol eller anden kode (fx QR-side)
window.addPiece = addPiece;
