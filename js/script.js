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
