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

// Info-knap (bare en alert eller lignende)
const infoBtn = document.getElementById("howItWorksButton");
if (infoBtn) {
  infoBtn.addEventListener("click", () => {
    alert(
      "Når du har samlet puslespilsbrikker, kan du skrive din kode og få adgang til mere indhold.",
    );
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

// Åbn modal, når der klikkes på "Skriv kode"
if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    modal.style.display = "flex"; // Vis modal (flex centrerer boksen)
    codeInput.value = ""; // Ryd tidligere indtastning
    codeInput.focus(); // Placer markøren i inputfeltet
  });
}

// Luk modal, når der klikkes på krydset
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

// Luk modal, hvis man klikker uden for den hvide boks (på den mørke baggrund)
window.addEventListener("click", (event) => {
  if (event.target === overlay) {
    overlay.style.display = "none";
  }
});

// Godkend-knap: Gem koden i localStorage
if (codeAcceptBtn) {
  codeAcceptBtn.addEventListener("click", () => {
    const kode = codeInput.value.trim();
    if (kode === "") {
      alert("Indtast venligst en kode.");
      return;
    }
    // Gem koden i localStorage
    localStorage.setItem("museumKode", kode);
    alert(`Koden "${kode}" er gemt. Du kan nu lukke vinduet.`);
    modal.style.display = "none";
    // Her kan du senere omdirigere eller vise nyt indhold
  });
}

// Hvordan fungere dette? (inde i modal)
if (codeHowItWorksBtn) {
  codeHowItWorksBtn.addEventListener("click", () => {
    alert(
      "Få en kode på din mobil, når du har samlet puslespilsbrikker. Indtast den her.",
    );
  });
}
