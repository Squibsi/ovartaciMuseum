"use strict";

// Puslespilsbrikker
// puzzle1, puzzle2 osv bruges til at lave qr-koderne.
const puzzleData = {
    puzzle1: `Scanning gennemført! <br> Du har fundet: 
            <br> 
            <h2>Identitet!</h2> <br>
            <img src="../img/filled-brain1.svg" alt="identitetbrik">`,

    puzzle2: `Scanning gennemført! <br> Du har fundet: 
            <br> <h2>Fantasi, Drømme <br> og Visioner!</h2> <br>
            <img src="../img/filled-brain2.svg" alt="fantasi, drømme og visioner brik">`,

    puzzle3: `Scanning gennemført! <br> Du har fundet: 
            <br> <h2>Normalitet!</h2> <br>
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

    // Henter "puzzle1, puzzle2" osv. fra puzzleData og fjerner ordet "puzzle".
    // Det gør at vi kun har tallene som bruges til id.
    const brainId = decodedText.replace("puzzle", "");

    // Kalder på funktionen addPiece med brainId som argument.
    addPiece(brainId);

    renderPuzzle();
    // Håndterer den funde QR-kode
    // Det vil sige at der f.eks. vil stå "handlePuzzle(puzzle1)" hvis det er den der er scannet
    handlePuzzle(decodedText);
}

// Funktion til localStorage
function getFoundPieces() {
    // Henter "FoundPieces" fra localStorage og gemmer det i const "saved"
    const saved = localStorage.getItem("FoundPieces");

    // Hvis der findes data i "saved", konvereteres JSON til array/objekt og returneres.
    if(saved) {
        return JSON.parse(saved);
    }
    // Hvis der ikke findes data i "saved", returneres et tomt array.
    return [];
}

// Gemmer brikkerne i localStorage.
function saveFoundPieces(pieces) {
    localStorage.setItem("FoundPieces", JSON.stringify(pieces));
}

// Tilføjer brikken
function addPiece(brainId) {
    // Henter de brikker der er fundet, fra localStorage
    let found = getFoundPieces();

    // Tjekker om brikken har været scannet før. Hvis ikke køre næste kode.
    // Det gør at brikken ikke kan gemmes 2 gange i arrayet.
    if(!found.includes(brainId)) {
        // Tilføjer den nye brik til array.
        found.push(brainId);
        // Gemmer den nye opdaterede liste.
        saveFoundPieces(found);
        console.log(`Brik ${brainId} gemt`)
    }
}

// Viser puslespillet alt efter hvilke brikker der er fundet
    function renderPuzzle() {
        const found = getFoundPieces();

    // Tjekker om der findes en brik med id "1" i found. Hvis true sættes billedet ind med farve på.
    // Hvis false, forbliver den tom.
    if(found.includes("1")) {
        document.getElementById("bottomBrainPiece").src="../img/filled-brain1.svg";
    } else {
        document.getElementById("bottomBrainPiece").src="../img/blank-brain1.svg";
    }

    if(found.includes("2")) {
        document.getElementById("middleBrainPiece").src="../img/filled-brain2.svg";
    } else {
        document.getElementById("middleBrainPiece").src="../img/blank-brain2.svg";
    }

    if(found.includes("3")) {
        document.getElementById("bottomLeftBrainPiece").src= "../img/filled-brain3.svg";
    } else {
        document.getElementById("bottomLeftBrainPiece").src= "../img/blank-brain3.svg";
    }

    // Opdaterer teksten "?/7 fundet", baseret på hvor mange brikker der er scannet.
    const progressText = document.querySelector("#puzzleProgressText p");
    if(progressText) {
        // found.length er antallet af brikker fundet, altså længden på arrayet.
        progressText.textContent = `${found.length}/7 fundet`
    }
}

// Sørger for at opdatere/vise psulespillet efter siden er loaded
document.addEventListener("DOMContentLoaded", () => {
    renderPuzzle();
});


// Reset puslespilet
const resetBtn = document.getElementById("resetBtn");

// Fjerner puslespilsbrikkerne fra localStorage, så de ikke længere vises på skærmen
function resetPuzzle(){
    localStorage.removeItem("FoundPieces");
    // Kører funktionen renderPuzzle igen, efter localStorage er tømt.
    // Nu findes brikkerne ikke i localStorage længere så brikkerne bliver hvide og process teksten opdateres til 0. 
    renderPuzzle();
}

// Kører resetPuzzle funktionen når man klikker på "reset"-knappen
resetBtn.addEventListener("click", ()=>{
    resetPuzzle();
   
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
        alert("Ukendt QR-kode" + id)
        const errorSound = new Audio ("../sounds/error-soundeffect.mp3");
        errorSound.currentTime = 0;
        errorSound.play();
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


// Generering af museumskoden
function generateMuseumCode() {
    // hent de fundne brikker
    const found = getFoundPieces();

    // Tjekker om der ligger noget i arrayet (er der fundet nogle brikker?)
    // Hvis ikke, returnerer den null og stopper her, fordi der mangler at blive fundet brikker.
    // Det vil sige "du kan ikke generere en kode, for du har ikke fundet nogle brikker endnu"
    if(found.length === 0) {
        return null;
    }

    // Sorterer brikkerne så de altid ligger i samme rækkefølge, uanset hvilken rækkefølge de er fundet i.
    // På den måde bliver koden ens uanset rækkefølge eller gæst.
    found.sort();

    // Sætter koden sammen med bindestreg.
    return found.join("-");
}

const generateCodeBtn = document.getElementById("generateCodeBtn");

if(generateCodeBtn) {
    generateCodeBtn.addEventListener("click", ()=>{

        // Henter gæstens kode.
        const code = generateMuseumCode();

        // Tjekker om gæsten har fundet en brik endnu. (!code) Betyder "hvis IKKE".
        // Hvis (!code) = true, køres if funktionen og man får pop-oppen. Det bliver den kun hvis der ikke er fundet en brik.
        if(!code){
            alert("Du har ikke fundet nogen brikker endnu");
            return;
        }

        // Indsætter indholdet af "code" i tekst-feltet "museumCodeText" fra HTML.
        document.getElementById("museumCodeText").textContent = code;
        // Viser pop-op vinduet. "Flex" giver mulighed for mere styling end "block", som er lettere til pop-ops
        document.getElementById("codePopUp").style.display = "flex";
        // Skjuler "reset"-knappen
        document.getElementById("resetBtn").style.display = "none";
    });
}

// Funktion til at lukke pop-op vinduet igen
const closeCodePopUpBtn = document.getElementById("closeCodePopUp");

if(closeCodePopUpBtn) {
    closeCodePopUpBtn.addEventListener("click", () => {
        // Skjuler pop-op vinduet.
        document.getElementById("codePopUp").style.display = "none";
        // Viser "reset"-knappen igen
        document.getElementById("resetBtn").style.display = "block";
    });
}