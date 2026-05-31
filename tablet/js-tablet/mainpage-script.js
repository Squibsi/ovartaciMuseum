"use strict";

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

  // Opdater hvert slot: hvis brik-id er fundet, skift til farvet billede
  brainPieces.forEach((brainPiece) => {
    const pieceId = brainPiece.getAttribute("data-piece-id");
    if (found.includes(pieceId)) {
      // Skift til farvet version (antaget filnavn: farvet-brik1.png, farvet-brik2.png...)
      const farvetSti = `../img/farvet-${pieceId}.png`;
      if (brainPiece.src !== farvetSti) {
        brainPiece.src = farvetSti;
        // Tilføj fade-klasse (hvis du har CSS)
        brainPiece.classList.add("ny");
        setTimeout(() => brainPiece.classList.remove("ny"), 500);
      }
    } else {
      // Sæt blankt billede tilbage (hvis en brik fjernes ved logout)
      const blankSti = `../img/blank-${pieceId}.png`; // eller brug de oprindelige stier
      // Du skal kende de oprindelige blanke stier. Her en simpel måde:
      if (pieceId === "piece1") brainPiece.src = "../img/blank-brain1.svg";
      if (pieceId === "piece2") brainPiece.src = "../img/blank-brain2.svg";
      if (pieceId === "piece3") brainPiece.src = "../img/blank-brain6.svg";
    }
  });

  // Opdater tællertekst
  const amountFound = found.length;
  tekstParagraf.innerText = `${amountFound}/${total} fundet`;
}

// ----- Tilføj en ny brik (kaldes når QR kode scannes) -----
function addPiece(pieceId) {
  let found = getFoundPieces();
  if (!found.includes(pieceId)) {
    found.push(pieceId);
    saveFoundPieces(found);
    updatePuzzle();
    console.log(`Brik ${pieceId} tilføjet!`);
  } else {
    console.log(`Brik ${pieceId} allerede fundet.`);
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
