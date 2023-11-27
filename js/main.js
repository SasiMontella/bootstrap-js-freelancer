

let codiciSconto = {
    YHDNU32: true,
    JANJC63: true,
    PWKCN25: true,
    SJDPO96: true,
    POCIE24: true,
};

let prezzi = {
    frontend: 15.30,
    backend: 20.50,
    analysis: 33.60,
};

let formattatorePrezzo = new Intl.NumberFormat(navigator.languages[0], {
    style: 'currency',
    currency: 'EUR'
});


let elementoForm = document.getElementById("formOfferta");
let inputTipoLavoro = document.getElementById("worktype");
let inputSconto = document.getElementById("discountcode");
let scontoInvalido = document.getElementById("feedbackScontoInvalido");
let scontoValido = document.getElementById("feedbackScontoValido");
let spanPrezzo = document.getElementById("spanPrezzo");
let inputOre = document.getElementById("hoursrequired");











// ---------------------------- Funzioni ---------------------------- 

function mandaForm(event) {
    event.preventDefault();



    let formValido = elementoForm.checkValidity();
    if (formValido) {
        let codiceInserito = inputSconto.value;
        let prezzo = prezzi[inputTipoLavoro.value] * inputOre.value;
        if (codiceInserito) { // Se effettivamente c'è un codice da controllare
            if (codiciSconto.hasOwnProperty(codiceInserito)) { // Se il codice esiste
                if (codiciSconto[codiceInserito]) { // ed è ancora valido

                    prezzo = prezzo * (1 - 0.25); // Applica sconto
                    codiciSconto[codiceInserito] = false; // Marchia codice come scaduto / usato
                    impostaScontoComeValido(); // Marchia input come valido
                    mostraPrezzo(prezzo);
                    
                } else { // Altrimenti è scaduto
                    impostaScontoComeScaduto();
                    mostraPrezzo(prezzo);
                }
            } else { // Altrimenti non esiste proprio
                impostaScontoComeInesistente();
            }
        } else {
            mostraPrezzo(prezzo);
        }
    }
};


function mostraPrezzo(prezzo) {
    spanPrezzo.parentNode.parentNode.classList.remove('d-none'); // Mostra prezzo
    spanPrezzo.innerHTML = formattatorePrezzo.format(prezzo);
}


function impostaScontoComeValido() {
    scontoValido.innerHTML = "Codice valido! Sconto del 25% applicato"; // Aggiorna messaggio di codice valido
    inputSconto.classList.add('is-valid', 'text-success');
}


function impostaScontoComeInesistente() {
    scontoInvalido.innerHTML = "Il codice non esiste."; // Aggiorna messaggio di codice invalido
    inputSconto.classList.add('is-invalid', 'text-danger');
}


function impostaScontoComeScaduto() {
    scontoInvalido.innerHTML = "Codice scaduto o già utilizzato."; // Aggiorna messaggio di codice invalido
    inputSconto.classList.add('is-invalid', 'text-danger');
}
