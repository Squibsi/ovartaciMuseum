"use strict";



// Laver animation mellem start-siden og scanner-siden
document.getElementById("tried-before-btn").addEventListener("click", () => {
    document.body.classList.add("fade-out");

    setTimeout(() => {
        // window finder browser-vinduet location.href finder adressen og skifter den til den nye (phone-scanner.html)
        window.location.href = "phone-scanner.html";
    }, 500);
});

const helpBtn = document.getElementById("helpBtn");
const onboarding = document.querySelector(".onboarding");
const startContent = document.querySelector(".start-content");


helpBtn.addEventListener("click", () => {
    onboarding.style.display = "flex";
    startContent.style.display = "none";

    currentStep = 0;
    renderSteps();
});

// Array til instruktionsslides efter klik på "hjælp mig i gang"-knappen

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
      text: "Generér din kode og tast den ind på skærmen til sidst",
      img: "indsæt billede her"  
    }
];


let currentStep = 0

const instructionText = document.getElementById("instructionText");
const instructionImg = document.getElementById("instructionImg");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");


function renderSteps() {
    instructionText.textContent = instructions[currentStep].text;
    instructionImg.src = instructions[currentStep].img;

    // Opdater progress dots
    dots.forEach((dot, index) => {
        if (index === currentStep) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });

    if (currentStep === instructions.length - 1) {
        nextBtn.textContent = "Start";
    } else {
        nextBtn.textContent = "Næste";
    }
}

nextBtn.addEventListener("click", () => {
    if (currentStep < instructions.length - 1) {
        currentStep++;
        renderSteps();
    } else {
        window.location.href = "phone-scanner.html";
    }
});


renderSteps();