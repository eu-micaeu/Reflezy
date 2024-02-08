const quadro = document.getElementById("quadro");
const pontuacaoElement = document.getElementById("pontuacao");
const tempoElement = document.getElementById("tempo");
let pontos = 0;
let tempoRestante = 60;

function formatarTempo(milissegundos) {
    const segundos = Math.floor((milissegundos % 60000) / 1000);
    return `${segundos.toString().padStart(2, '0')}`;
}

function criarBolinha() {
    const bolinha = document.createElement("div");
    bolinha.classList.add("bolinha");
    bolinha.style.backgroundColor = "red";

    const tamanhoBolinha = (50 - 10) + 10;
    bolinha.style.width = bolinha.style.height = tamanhoBolinha + "px";

    const maxTop = quadro.clientHeight - tamanhoBolinha;
    const maxLeft = quadro.clientWidth - tamanhoBolinha;
    bolinha.style.top = Math.random() * maxTop + "px";
    bolinha.style.left = Math.random() * maxLeft + "px";

    bolinha.addEventListener("click", function () {
        pontos++;
        bolinha.style.backgroundColor = "green";
        pontuacaoElement.textContent = "Pontuação: " + pontos;

        setTimeout(() => {
            bolinha.style.backgroundColor = "red";
            bolinha.remove();
        }, 100);
    });

    quadro.appendChild(bolinha);

    setTimeout(() => {
        if (bolinha.parentNode) {
            bolinha.remove();
        }
        criarBolinha();
    }, 700);
}

function atualizarTempo() {
    tempoElement.textContent = "Segundos restantes: " + formatarTempo(tempoRestante * 1000);
}

function iniciarTemporizador() {

    setInterval(() => {

        if (tempoRestante <= 0) {
            tempoRestante = 0;
            const pontFinal = document.getElementById("pontFinal");
            pontFinal.textContent = "Pontuação final: " + pontos;
            resultadoPopup();
        }

        tempoRestante--;

        atualizarTempo();

    }, 1000);

}

const game = document.getElementById("game");
const startButton = document.getElementById("btnIniciar");
const recordsButton = document.getElementById("btnRecordes");

function inicalizarJogo() {
    startButton.style.display = "none";
    recordsButton.style.display = "none";
    game.style.display = "block";
    game.style.position = "relative";
    criarBolinha();
    iniciarTemporizador();
}

function reiniciarJogo() {
    inicalizarJogo();
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";

    const resultado = document.getElementById("resultado");
    resultado.style.display = "none";

}

function resultadoPopup() {

    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    const resultado = document.getElementById("resultado");
    resultado.style.display = "flex";
    resultado.style.position = "absolute";

}

function salvarJogo(){

    fetch('/salvar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: "teste",
            recorde: pontos
        })
    })

}