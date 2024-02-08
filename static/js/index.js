document.addEventListener("DOMContentLoaded", function () {
    const quadro = document.getElementById("quadro");
    const pontuacaoElement = document.getElementById("pontuacao");
    let pontos = 0;

    function criarBolinha() {
        const bolinha = document.createElement("div");
        bolinha.classList.add("bolinha");
        bolinha.style.backgroundColor = "red";
    
        const tamanhoBolinha = (50 - 10) + 10;
        bolinha.style.width = bolinha.style.height = tamanhoBolinha + "px";

        // Adiciona a bolinha em uma posição aleatória dentro do quadro
        const maxTop = quadro.clientHeight - tamanhoBolinha;
        const maxLeft = quadro.clientWidth - tamanhoBolinha;
        bolinha.style.top = Math.random() * maxTop + "px";
        bolinha.style.left = Math.random() * maxLeft + "px";
    
        bolinha.addEventListener("click", function () {
            pontos++;
            setTimeout(() => {
                bolinha.style.backgroundColor = "green";
            }, 100);
            pontuacaoElement.textContent = "Pontuação: " + pontos;
            bolinha.remove();
        });

        quadro.appendChild(bolinha);
    
        setTimeout(() => {
            if (bolinha.parentNode) {
                bolinha.remove();
            }
            criarBolinha();
        }, 1000);
    }

    // Inicializa o jogo
    criarBolinha();
});

/////////////////////////////////////////////////////////////////////////////////////////////////

const game = document.getElementById("game");

function inicalizarJogo() {
    game.style.display = "block";
    game.style.position = "relative";
}