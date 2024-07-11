const imgs = document.getElementById('img');
const imgList = document.querySelectorAll("#img img");

let i = 0;
let direction = 1; // Direção do carrossel (1 = para frente, -1 = para trás)

function carousel() {
    i += direction;

    if (i >= imgList.length) {
        i = imgList.length - 2; // Define para a penúltima imagem
        direction = -1; // Muda a direção para trás
    } else if (i < 0) {
        i = 1; // Define para a segunda imagem
        direction = 1; // Muda a direção para frente
    }

    imgs.style.transform = `translateX(${-i * 500}px)`;
}

setInterval(carousel, 2500);

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    let intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(intervalId); // Para o temporizador
            display.textContent = "O cupom expirou"; // Exibe a mensagem de cupom expirado
        }
    }, 1000);
}

window.onload = function () {
    const duration = 4 * 60; // Duração em segundos (exemplo: 4 minutos)
    const display = document.querySelector("#timer");

    startTimer(duration, display);
};
