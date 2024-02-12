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

    const tamanhoBolinha = 50;

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

    }, 750);

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

const introducao = document.getElementById("introducao");

function inicalizarJogo() {

    fecharRecordes();

    introducao.style.display = "none";

    startButton.style.display = "none";

    recordsButton.style.display = "none";

    game.style.display = "block";

    game.style.position = "relative";

    criarBolinha();

    iniciarTemporizador();

}

function resultadoPopup() {

    const overlay = document.getElementById("overlay");

    overlay.style.display = "block";

    const resultado = document.getElementById("resultado");

    resultado.style.display = "flex";

}

function reiniciarJogo() {
    window.location.href = window.location.pathname + "?restart=true";
}

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get("restart") === "true") {
        const btnIniciar = document.getElementById("btnIniciar");
        if (btnIniciar) {
            btnIniciar.click();
        }
    }
});


function salvarJogo() {

    if (document.getElementById("nome").value == "") {

        alert("Digite um nome para salvar o recorde");

    }

    fetch('/salvar', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            usuario: document.getElementById("nome").value.toUpperCase(),

            recorde: pontos

        })

    })

        .then(response => {

            if (!response.ok) {

                throw new Error('Erro ao salvar o recorde');

            }

            const salvo = document.getElementById("salvo");

            salvo.style.display = "flex";

            setTimeout(() => {

                salvo.style.display = "none";

                window.location.href = "/";

            }, 2000);

        })

        .catch(error => {

            console.error(error);

        });

}

async function mostrarRecordes() {
    try {
        const response = await fetch('/recordes');

        if (!response.ok) {
            throw new Error('Erro ao obter os recordes');
        }

        const data = await response.json();
        const tabela = document.getElementById('tabela');

        // Limpa a tabela antes de adicionar novos dados
        tabela.innerHTML = '';

        // Utiliza o método map para criar um array de linhas da tabela
        const linhas = data.map(item => {
            const linha = document.createElement('tr');
            const coluna = document.createElement('td');

            coluna.textContent = item.usuario + '   ➠ ' + item.recorde;

            linha.appendChild(coluna);

            return linha;
        });

        // Adiciona todas as linhas à tabela de uma vez
        linhas.forEach(linha => tabela.appendChild(linha));

        // Exibe a tabela apenas depois de todos os dados terem sido adicionados
        document.getElementById('recordes').style.display = 'flex';
    } catch (error) {
        console.error(error);
    }
}

function fecharRecordes() {
    document.getElementById('recordes').style.display = 'none';
}



