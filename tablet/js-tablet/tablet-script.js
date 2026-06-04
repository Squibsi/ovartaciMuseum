"use strict";
// =====================================================================================================
// Slide - animation
//======================================================================================================

// henter elementer fra Dom
const track = document.getElementById("sliderTrack");
const amountImages = 3; // tæller hvor mange img du har i slideren

//currentIndex holder styr på, hvilket billede , der vises i slideren. altså den aktuelle state. derfor skal denne også være let, da den skifter.
let currentIndex = 0;

//slide animation
// Her manipuleres css-egenskaber direkte i js.
// transform: translateX(-100%) flytter elementet 100% til venstre
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
// setInterval() kalder funktinon nextslide med et tidsinterval på 4000 ms
setInterval(nextSlide, 4000);

// Info-knap (fører til tutorial.html)
const infoBtn = document.getElementById("howItWorksButton");
if (infoBtn) {
  infoBtn.addEventListener("click", () => {
    window.location.href = "tutorial.html";
  });
}

// =====================================================================================================
// login
//======================================================================================================

// Hent elementer direkte fra index.html
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
// trim() fjerner mellemrum foran og bagved. så mellemrum ikke tæller med og skaber fejl
//pieces.every((id) => id === "1" || id === "2" || id === "3") tester for gyldige brik id'er og returner true, på indtastet id'er.
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

// inde i overlay fører til siden tutorial.html
if (codeHowItWorksBtn) {
  codeHowItWorksBtn.addEventListener("click", () => {
    window.location.href = "tutorial.html";
  });
}

// Kode til at vise brikker alt efter koden som gæsten har indtastet
//  Split konventere streng (tekst) til et array ved at klippe ved bindestreg.
function loadPuzzleFromCode(Code) {
  const pieces = Code.split("-");
  // informere i Console.log at brikker er blevet fundet.
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
