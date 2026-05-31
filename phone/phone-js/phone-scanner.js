"use strict";

// Puslespilsbrikker

const puzzleData = {
    puzzle1: "Du fandt brik 1!",
    puzzle2: "Du fandt brik 2!",
    puzzle3: "Du fandt brik 3"
};




// -------QR-SCANNER-------

const startScanBtn = document.getElementById("startScannerBtn");

let scanner;
let scanned = false;

startScanBtn.addEventListener("click", startScanner);

function startScanner() {

    if(scanning) return;

    scanner = new Html5Qrcode("reader");
    scanning = true;

    scanner.start(
        
        {facingMode: "environment"},

        {
            fps: 10,
            qrbox: 250
        },

        onScanSuccess,
    );
}


function onScanSuccess(decodedText) {
    console.log("Scannet:", decodedText);

    scanner.stop().then(() => {
        scanning = false;
    });

    handlePuzzle(decodedText);
}



// -------POP-OP VINDUE-------

function handlePuzzle(id) {
    const text = puzzleData[id];

    if(!text) {
        alert("Ukendt QR-kode" + id);
        return;
    }

    document.getElementById("popUpText").textContent = text;
    document.getElementById("popUp").style.display = "block";
}


function closePopUp() {
    document.getElementById("popUp").style.display = "none";
}