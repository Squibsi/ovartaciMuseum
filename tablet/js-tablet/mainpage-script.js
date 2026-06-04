"use strict";

// =====================================================================================================
// Puslespil - håndtering af fundne brikker og Klik events
//======================================================================================================

// Hent DOM-elementer
const brainPieces = document.querySelectorAll(".brainPiece");
const tekstParagraf = document.querySelector("#puzzleProgressText p"); // tager fat i teksten  der viser hvor mange brikker der er.
const logOutBtn = document.getElementById("logOutBtn"); // log ud knap

// Funktioner til localStorage
// Henter fundne brikker fra localStorage
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

// Opdater visning af brikker og tæller
function updatePuzzle() {
  const found = getFoundPieces();
  const total = brainPieces.length; // = 3

  // Opdater hvert tomme brainPiece: hvis brik-id er fundet, skift til farvet billede
  // getAttribute("data-brain-id") henter værdien af data-brain-id attributten fra html
  // found.includes(brainId) tjekker om brik-id'et er i listen over fundne brikker (mekanisme man også tit bruger til at lave søgefelter)
  brainPieces.forEach((brainPiece) => {
    const brainId = brainPiece.getAttribute("data-brain-id");
    if (found.includes(brainId)) {
      // Skift til farvet version (antaget filnavn: farvet-brik1.png, farvet-brik2.png...)
      const colorPath = `../img/filled-brain${brainId}.svg`; // gør den farvet tallet for brainid indsættes i ${brainId}
      if (brainPiece.src !== colorPath) {
        brainPiece.src = colorPath;
        // brainPiece.src repræsentere billedets src-attribut, det nye billede loades i browser og giver illusionen af den skifter farve
        brainPiece.classList.add("ny");
        setTimeout(() => brainPiece.classList.remove("ny"), 500);
      }
      // Gør den klikbar (cursor: pointer er dog kun til computer)
      brainPiece.style.cursor = "pointer";
      // clickDealer (arrow funktion) fører til korrekt collage side
      if (!brainPiece.clickDealer) {
        const dealer = () => {
          // nu åbnes det html med samme tal som brainId det vil sige brainId 1 => Collage1.html
          window.location.href = `collage${brainId}.html`;
        };
        brainPiece.addEventListener("click", dealer);
        brainPiece.clickDealer = dealer;
      }
    } else {
      // Sæt blankt billede tilbage (hvis en brik fjernes ved logout)
      let blankPath = `../img/blank-brain${brainId}.svg`;
      if (brainId === "1") brainPiece.src = "../img/blank-brain1.svg";
      else if (brainId === "2") brainPiece.src = "../img/blank-brain2.svg";
      else if (brainId === "3") brainPiece.src = "../img/blank-brain3.svg";
      if (brainPiece.src !== blankPath) {
        brainPiece.src = blankPath;
      }
      // Fjern klik-funktionalitet (så man ikke kan gå ind på blanke brikker)
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

// =====================================================================================================
// update - Ikke længere en funktion brugt !OBS ikke aktiv lige nu!
//======================================================================================================

// Tilføj en ny brik (kaldes når QR kode scannes)
// Denne funktion ville kunne bruges i sammenhæng med en update knap, men denne endte ikke med at blive implementeret i denne omgang
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

// =====================================================================================================
// log ud
//======================================================================================================

// Nulstil alle brikker (log ud)
// fjerner fundne brikker fra localStorage (FoundPieces) og kører dernæst funktionen updatePuzzle, på den måde bliver alt nulstillet
function resetPuzzle() {
  localStorage.removeItem("FoundPieces");
  updatePuzzle();
  console.log("Spillet er nulstillet");
}

// Log ud knap: nulstil puslespil og gå til forsiden
if (logOutBtn) {
  logOutBtn.addEventListener("click", () => {
    resetPuzzle(); // Nulstiller localStorage og opdaterer visning
    window.location.href = "index.html"; // Går til index-siden
  });
}

// Initialisering ved pageload
// tvinger opdatering af puslespil
// getFoundPieces() læser LocalStorage og laver et array
document.addEventListener("DOMContentLoaded", () => {
  updatePuzzle();
  console.log("Hentede fundne:", getFoundPieces());
});

// Gør addPiece global, så den kan kaldes fra konsol eller anden kode (fx QR-side)
window.addPiece = addPiece;
