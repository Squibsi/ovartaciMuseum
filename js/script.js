"use strict";

// Hent billed-elementet
const slideImg = document.getElementById("slideImg");

// Liste over billeder
const images = [
  "../img/slide1.png",
  "../img/slide2.jpg",
  "../img/slide3.png",
  "../img/slide4.jpg",
  // tilføj flere efter behov
];

let currentIndex = 0;

// Funktion til at skifte billede
function switchImage() {
  // Gå til næste billede (cyklisk)
  currentIndex = (currentIndex + 1) % images.length;
  slideImg.src = images[currentIndex];
}

// Start automatisk skift hvert 4. sekund (4000 ms)
let intervalId = setInterval(switchImage, 4000);

// Info-knap (bare en alert eller lignende)
const infoBtn = document.getElementById("howItWorksButton");
if (infoBtn) {
  infoBtn.addEventListener("click", () => {
    alert(
      "Når du har samlet puslespilsbrikker, kan du skrive din kode og få adgang til mere indhold.",
    );
  });
}
