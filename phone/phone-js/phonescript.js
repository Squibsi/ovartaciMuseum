"use strict";



// Laver animation mellem start-siden og scanner-siden
document.getElementById("tried-before-btn").addEventListener("click", () => {
    document.body.classList.add("fade-out");

    setTimeout(() => {
        // window finder browser-vinduet location.href finder adressen og skifter den til den nye (phone-scanner.html)
        window.location.href = "phone-scanner.html";
    }, 500);
});

