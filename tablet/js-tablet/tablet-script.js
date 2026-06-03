"use strict";
const track = document.getElementById("sliderTrack");
const amountImages = 3; // <-- tæl hvor mange img du har i slideren

let currentIndex = 0;

//slide animation
function slideTo(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
}

function nextSlide() {
  let newIndex = currentIndex + 1;
  if (newIndex >= amountImages) {
    newIndex = 0;
  }
  slideTo(newIndex);
}

// Start automatisk skift hvert 4. sekund
setInterval(nextSlide, 4000);

// Info-knap (fører til tutorial.html)
const infoBtn = document.getElementById("howItWorksButton");
if (infoBtn) {
  infoBtn.addEventListener("click", () => {
    window.location.href = "tutorial.html";
  });
}

const slideImage = document.querySelector("#slideImage");

const slides = ["img/slide1.png", "img/slide2.png", "img/slide3.png"];

// =====================================================================================================
// login
//======================================================================================================

// Hent elementer
const overlay = document.getElementById("overlayCode");
const generateBtn = document.getElementById("generateCodeButton");
const closeBtn = document.querySelector(".closeBtn");
const codeAcceptBtn = document.getElementById("codeAcceptBtn");
const codeHowItWorksBtn = document.getElementById("codeHowItWorksBtn");
const codeInput = document.getElementById("codeInput");

// Åbn overlay, når der klikkes på "Skriv kode"
if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    overlay.style.display = "flex"; // Vis overlay (flex centrerer boksen)
    codeInput.value = ""; // Ryd tidligere indtastning
    codeInput.focus(); // Placer markøren i inputfeltet
  });
}

// Luk overlay, når der klikkes på krydset
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

// Luk overlay, hvis man klikker uden for den hvide boks (på den mørke baggrund)
window.addEventListener("click", (event) => {
  if (event.target === overlay) {
    overlay.style.display = "none";
  }
});

// Godkend-knap: Gem koden i localStorage
if (codeAcceptBtn) {
  codeAcceptBtn.addEventListener("click", () => {
    const Code = codeInput.value.trim();
    if (Code === "") {
      alert("Indtast venligst en kode.");
      return;
    }
    // Split koden ved "-" for at få array af brik-id'er (f.eks. "1-2-3" -> ["1","2","3"])
    const pieces = Code.split("-");
    // Valider at alle elementer er "1", "2" eller "3" (eller andre gyldige id'er)
    const valid = pieces.every((id) => id === "1" || id === "2" || id === "3");
    if (!valid || pieces.length === 0) {
      alert(
        "Ugyldig kode. Koden består af tal adskilt af bindestreg, f.eks. 1-2-3",
      );
      return;
    }
    // Gem koden i localStorage
    localStorage.setItem("FoundPieces", JSON.stringify(pieces));
    // Omdiriger til mainpage (justér stien efter dit projekt)
    window.location.href = "../tablet/mainpage.html";
    // console
    console.log("Gemmer i localStorage:", JSON.stringify(pieces));
  });
}

// Hvordan fungere dette? (inde i overlay) fører til siden tutorial.html
if (codeHowItWorksBtn) {
  codeHowItWorksBtn.addEventListener("click", () => {
    window.location.href = "tutorial.html";
  });
}

// Kode til at vise brikker alt efter koden som gæsten har indtastet
function loadPuzzleFromCode(Code) {
  const pieces = Code.split("-");

  if (pieces.includes("1")) {
    console.log("Vis identitet");
  }

  if (pieces.includes("2")) {
    console.log("Vis Fantasi");
  }

  if (pieces.includes("3")) {
    console.log("Vis Normalitet");
  }
}
