// Removendo tela inicial após clique em start
const start = document.getElementById('btn-start');
const telaInicial = [...document.querySelectorAll('#table-games, #jogador-vez')]
const telaGameValidated = document.getElementById('table-game-validated')
const main = document.getElementsByTagName('main')[0];

start.addEventListener('click', function () {
    const playersInput = [...document.querySelectorAll('#player-one, #player-two')]
    playersNameOne = playersInput[1].value;
    playersNameTwo = playersInput[0].value;
    playersNameOne && playersNameTwo ? (
        telaInicial.map(telaInicial => telaInicial.remove()),
        telaGameValidated.classList.remove('display-none'), telaGameValidated.classList.add('d-flex')) :
        alert('Ops! \nVocê precisa definir o nome dos dois jogadores.')
})

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const cells = document.querySelectorAll('.cell');
const board = document.querySelector('#board');
const gameEndMessage = document.querySelector('.data-game-end-message');
const gameEndElement = document.querySelector('#gameEndElement');
const restartButton = document.querySelector('#restartButton');
let xClass = 'markX';
let oClass = 'markO';
let xTurn;
let playersNameOne, playersNameTwo;

startGame();

function startGame() {
    xTurn = true;
    gameEndElement.classList.add('display-none');
    gameEndElement.classList.remove('show');

    cells.forEach(cell => {
        cell.classList.remove('markO');
        cell.classList.remove('markX');
        cell.addEventListener('click', handleClick, { once: true })
    });
    restartButton.addEventListener('click', startGame)
    main.classList.remove('end')
}

function handleClick(e) {
    let cell = e.target;
    let turnClass = xTurn ? xClass : oClass;

    placeMark(cell, turnClass);

    if (checkWin(turnClass)) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        swapTurn();
    }
}

function placeMark(cell, turnClass) {
    cell.classList.add(turnClass);
}

function swapTurn() {
    xTurn = !xTurn;
}

function checkWin(turnClass) {
    return lines.some(line => {
        return line.every(index => {
            return cells[index].classList.contains(turnClass);
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    });
}

function endGame(draw) {
    if (draw) {
        gameEndMessage.innerHTML = 'Empate!';
    } else {
        gameEndMessage.innerHTML = `O jogador ${xTurn ? playersNameTwo : playersNameOne} venceu. Parabéns!!!`;
    }
    gameEndElement.classList.add('show');
    gameEndElement.classList.remove('display-none');
    main.classList.add('end');
}
