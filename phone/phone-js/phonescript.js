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
const startScreen = document.querySelector(".phone");


helpBtn.addEventListener("click", () => {
    onboarding.style.display = "block";
    startScreen.style.display = "none";

    currentStep = 0;
    renderSteps();
});

// Array til instruktionsslides efter klik på "hjælp mig i gang"-knappen

const instructions = [
    {
      text: "Indsæt instruktion 1 her",
      img: "indsæt billede her"  
    },
    {
      text: "Indsæt instruktion 2 her",
      img: "indsæt billede her"  
    },
    {
      text: "Indsæt instruktion 3 her",
      img: "indsæt billede her"  
    },
    {
      text: "Indsæt instruktion 4 her",
      img: "indsæt billede her"  
    }
];


let currentStep = 0

const instructionText = document.getElementById("instructionText");
const nextBtn = document.getElementById("nextBtn");


function renderSteps() {
    instructionText.textContent = instructions[currentStep].text;

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