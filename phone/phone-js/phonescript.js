"use strict";


// --------- Start side transition ----------

// Laver animation mellem start-siden og scanner-siden
document.getElementById("triedBeforeBtn").addEventListener("click", () => {
    document.body.classList.add("fade-out");

    setTimeout(() => {
        // window finder browser-vinduet location.href finder adressen og skifter den til den nye (phone-scanner.html)
        window.location.href = "phone-scanner.html";
    }, 500);
});

const helpBtn = document.getElementById("helpBtn");
const onboarding = document.querySelector(".onboarding");
const startContent = document.querySelector(".startContent");

// Tilføjer klik-event til "hjælp mig i gang"-knappen
helpBtn.addEventListener("click", () => {
    onboarding.style.display = "flex";
    startContent.style.display = "none";

    currentStep = 0;
    renderSteps();
});


// --------- Array til instruktionsslides efter klik på "hjælp mig i gang"-knappen ---------

const instructions = [
    {
      text: "Find QR-koderne rundt omkring i museets områder",
      img: "../img/qr-code-img.png"  
    },
    {
      text: "Start scanneren og scan QR-koderne",
      img: "../img/qr-code-img.png"  
    },
    {
      text: "Saml de forskellige områder på museet",
      img: "../img/full-empty-brain.svg"
    },
    {
      text: "Generér din kode og tast den ind på tabletten til sidst, som vist her",
      img: "../img/skriv-koden.svg"
    }
];

// --------- Introduktionsslides ---------

let currentStep = 0

const instructionText = document.getElementById("instructionText");
const instructionImg = document.getElementById("instructionImg");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");

// Funktion til introduktionsslides
function renderSteps() {
    // Henter tekst og billede til det step brugeren er på
    instructionText.textContent = instructions[currentStep].text;
    instructionImg.src = instructions[currentStep].img;

    // Reset så animationerne spiller igen næste gang
    const overlay = document.getElementById("instructionOverlay");
    overlay.style.opacity = 0;
    overlay.classList.remove("fade-in");

    const cornerEffect = document.getElementById("cornerEffect");
    cornerEffect.classList.remove("fade-corners");

    instructionImg.classList.remove("slide-up", "fade-in", "wide-image");

    // Opdater progress dots
    dots.forEach((dot, index) => {
        if (index === currentStep) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });

    // --- ANIMATIONER ---
    if (currentStep === 0) {
        instructionImg.classList.add("slide-up");
    } else if (currentStep === 1) {
        cornerEffect.classList.add("fade-corners");
    } else if (currentStep === 2) {
        overlay.src = "../img/full-colour-brain.svg";
        overlay.classList.add("fade-in");
    } else if (currentStep === 3) {
        instructionImg.classList.add("slide-up");
        instructionImg.classList.add("wide-image");
    }

    // Hvis currentStep er det samme som længden af instruktionsarrayet - 1 skal knappen ændres fra "næste" til "start"
    if (currentStep === instructions.length - 1) {
        nextBtn.textContent = "Start";
    } else {
        nextBtn.textContent = "Næste";
    }
}

// Funktion til "næste"-knappen
nextBtn.addEventListener("click", () => {
    // Her tjekker vi om currentStep er mindre end længden på arrayet med steps.
    // Hvis true -> gå til næste step, hvis false -> link til puslespilssiden.
    if (currentStep < instructions.length - 1) {
        currentStep++;
        renderSteps();
    } else {
        window.location.href = "phone-scanner.html";
    }
});


renderSteps();