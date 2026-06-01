"use strict";

// Puslespilsbrikker
// puzzle1, puzzle2 osv bruges til at lave qr-koderne.
const puzzleData = {
    puzzle1: `Scanning gennemført! <br> Du har fundet: 
            <br> 
            <h2>Brik 1!</h2> <br>
            <img src="../img/filled-brain1.svg" alt="identitetbrik">`,

    puzzle2: `Scanning gennemført! <br> Du har fundet: 
            <br> <h2>Brik 2!</h2> <br>
            <img src="../img/filled-brain2.svg" alt="fantasi, drømme og visioner brik">`,

    puzzle3: `Scanning gennemført! <br> Du har fundet: 
            <br> <h2>Brik 3!</h2> <br>
            <img src="../img/filled-brain3.svg" alt="normalitet brik">`
};


// -------QR-SCANNER-------

// Henter "start-scanner"-knappen
const startScanBtn = document.getElementById("startScannerBtn");

// Gemmer scanner objektet her scanner.start og scanner.stop
let scanner;
// Tjekker om scanneren allerede køre, så den ikke startes flere gange før den er stoppet
let scanning = false;

// Åbner scanneren i sit eget "vindue" ved at skjule hjemmeskærmen
startScanBtn.addEventListener("click", () => {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("scannerScreen").style.display = "block";
    // Kalder på startScanner funktionen længere nede, og starter QR-kode-scanneren
    startScanner();
});
 
function startScanner() {

    // Tjekker om scanning = true. 
    // Hvis den er det stopper funktionen så brugeren ikke kan starte kameraet flere gange
    if(scanning) return;

    // Fortæller koden at scanneren skal placeres i "reader" i HTML
    scanner = new Html5Qrcode("reader");

    // Markerer at scanneren nu kører
    scanning = true;

    // Åbner kameraet så det er klar til at scanne koderne
    scanner.start(
        
        // Gør at kameraet automatisk bruger bagkameraet på mobilen
        { facingMode: "environment" },

        {
            // Betyder "analyser 10 billeder pr. sekund"
            fps: 10,
            // Betyder at scanneren kun forsøger at scanne et område svarende til 250x250 px
            qrbox: 250
        },

        // Kalder på funktionen "onScanSucces". Den fortæller hvad der skal ske når de har scannet koden
        onScanSuccess,
    );
}

// Her definerer vi hvad der skal ske når de har scannet en qr-kode
// Når koden er scannet bliver "decodedText" til f.eks "puzzle1"
function onScanSuccess(decodedText) {
    // Kun til test i konsollen
    console.log("Scannet:", decodedText);

    // Stopper qr-scanneren
    // Når scanneren er stoppet køres koden der er skrevet i "then(() => {}"
    scanner.stop().then(() => {
        // Fortæller koden at scanneren ikke længere kører så den igen kan startes af brugeren
        scanning = false;
    });

    const brainId = decodedText.replace("puzzle", "");

    addPiece(brainId);

    upDatePuzzleDisplay();
    // Håndterer den funde QR-kode
    // Det vil sige at der f.eks. vil stå "handlePuzzle(puzzle1)" hvis det er den der er scannet
    handlePuzzle(decodedText);
}

// Funktion til localStorage
function getFoundPieces() {
    const saved = localStorage.getItem("FoundPieces");

    if(saved) {
        return JSON.parse(saved);
    }

    return [];
}

// Gemmer brikkerne
function saveFoundPieces(pieces) {
    localStorage.setItem("FoundPieces", JSON.stringify(pieces));
}

// Tilføjer brikken
function addPiece(brainId) {
    let found = getFoundPieces();

    if(!found.includes(brainId)) {
        found.push(brainId);
        saveFoundPieces(found);
        console.log(`Brik ${brainId} gemt`)
    }
}

function upDatePuzzleDisplay() {
    const found = getFoundPieces();

    if(found.includes("1")) {
        document.getElementById("bottomBrainPiece").src= "../img/filled-brain1.svg";
    }

    if(found.includes("2")) {
        document.getElementById("bottomBrainPiece").src= "../img/filled-brain2.svg";
    }

    if(found.includes("3")) {
        document.getElementById("bottomBrainPiece").src= "../img/filled-brain3.svg";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    upDatePuzzleDisplay();
});






// -------POP-OP VINDUE-------

// Når en qr-kode scannes med samme navn som et af objekterne i puzzleData,
// registreres det som "id"'et i handlePuzzle(id)
function handlePuzzle(id) {
    // Leder efter et matchende id fra qr-koden til puzzleData
    // Teksten bliver så opdateret til den tilsvarende brik fra puzzleData
    const text = puzzleData[id];

    // Tjekker om der er scannet en tekst (navn/id) der matcher dem i puzzleData
    // hvis teksten er undefined, null eller tom bliver betingelsen true.
    if(!text) {
        // Hvis qr-koden ikke matcher et id i puzzleData, vises følgende besked
        alert("Ukendt QR-kode" + id);
        // Return stopper funktionen
        return;
    }
    // Hvis qr-koden matcher et id i puzzleData fortsætter funktionen og viser teksten fra popUp i HTML
    document.getElementById("popUpText").innerHTML = text;
    // Viser pop-op vinduet
    document.getElementById("popUp").style.display = "block";
}

// Laver en funktion til at lukke pop-op vinduet igen.
// Den er sat på som et click-event i HTML
function closePopUp() {
    // Lukker pop-op vinduet
    document.getElementById("popUp").style.display = "none";
    // Viser hjemmeskærmen igen
    document.getElementById("homeScreen").style.display = "block";
    // Skjuler scanner-skærmen
    document.getElementById("scannerScreen").style.display = "none";
}