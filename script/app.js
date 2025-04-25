//Constants=======================================

const sqrEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const redCounter = document.querySelector('.counter1');
const blueCounter = document.querySelector('.counter2');
const reset = document.querySelector('.reset');
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];

//Variables========================================

let options = ['', '', '', '', '', '', '', '', ''];
let Player = '🔴';
let redCount = 3;
let blueCount = 3;
redCounter.innerText = redCount;
blueCounter.innerText = blueCount;
let start = false;
let selectedIndex = null; 

//Functions========================================

const updateSqr = (sqr, index) => {
    options[index] = Player;
    sqr.textContent = Player;
    if (Player === '🔴') {
        redCount--;
        redCounter.innerText = redCount;
    } else {
        blueCount--;
        blueCounter.innerText = blueCount;
    }
};

const isValidMove = (fromIndex, toIndex) => {
    const fromRow = Math.floor(fromIndex / 3);
    const fromCol = fromIndex % 3;
    const toRow = Math.floor(toIndex / 3);
    const toCol = toIndex % 3;

    return (
        (Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol) === 1) 
    );
};

const handleClick = (event) => {
    const sqr = event.target;
    const sqrIndex = parseInt(sqr.getAttribute('sqrIndex'));

    if (options[sqrIndex] !== '' && redCount === 0 && blueCount === 0) {
        if (options[sqrIndex] === Player) {
            selectedIndex = sqrIndex;
        }
        return;
    }

    if (selectedIndex !== null) {
        if (options[sqrIndex] === '' && isValidMove(selectedIndex, sqrIndex)) {
            options[sqrIndex] = Player;
            options[selectedIndex] = '';
            sqrEls[sqrIndex].textContent = Player;
            sqrEls[selectedIndex].textContent = '';
            selectedIndex = null;
            theWiner();
            return;
        }else{
          selectedIndex = null;
          return;
        }
    }

    if (options[sqrIndex] !== '' || !start) {
        return;
    }
    if (Player === '🔴' && redCount === 0) {
        return;
    }
    if (Player === '🔵' && blueCount === 0) {
        return;
    }
    updateSqr(sqr, sqrIndex);
    theWiner();
};

const playerTurn = () => {
    Player = Player === '🔴' ? '🔵' : '🔴';
    message.textContent = `Player ${Player} turn`;
};

const resetGame = () => {
    options = ['', '', '', '', '', '', '', '', ''];
    Player = '🔴';
    redCount = 3;
    blueCount = 3;
    redCounter.innerText = redCount;
    blueCounter.innerText = blueCount;
    message.textContent = `${Player} turn first`;
    sqrEls.forEach((sqrEl) => (sqrEl.textContent = ''));
    start = true;
    selectedIndex = null;
    reset.style.display = 'none';
};

const theWiner = () => {
    let winOrNot = false;

    for (let i = 0; i < winCondition.length; i++) {
        const win = winCondition[i];
        const sqr1 = options[win[0]];
        const sqr2 = options[win[1]];
        const sqr3 = options[win[2]];

        if (sqr1 === '' || sqr2 === '' || sqr3 === '') {
            continue;
        }
        if (sqr1 === sqr2 && sqr2 === sqr3) {
            winOrNot = true;
            break;
        }
    }

    if (winOrNot) {
        message.textContent = `${Player} WIN 🥳!!`;
        start = false;
        reset.style.display = 'block'; // Show the reset button
    } else {
        playerTurn();
    }
};

//Event Listeners ==================================================

const gamePlay = () => {
    sqrEls.forEach((sqrEl, index) => {
        sqrEl.setAttribute('sqrIndex', index);
    });
    resetGame();
};

sqrEls.forEach((sqrEl) => {
    sqrEl.addEventListener('click', handleClick);
});

reset.addEventListener('click', resetGame);

gamePlay();
