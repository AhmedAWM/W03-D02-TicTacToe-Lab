/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr'); // Element for one square to be clicked later and filled with X or O
const messageEl = document.querySelector('#message'); // Message displayed if there is a winner or a tie
const pyroEl = document.querySelector('.pyro'); // This will used for fireworks!
const beforeEl = document.createElement('div'); // Creating fireworks divs
const afterEl = document.createElement('div'); // Creating fireworks divs
const resetButtonEl = document.querySelector('.reset-button'); // Reset button for the board to play again
const winningCombos = [ // All winning combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;


/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['', '', '', 
             '', '', '',
             '', '', ''];
    turn = 'X'
    winner = false;
    tie = false;

    render();

    console.log('Initializing done!')
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((input, i)  => {
        squareEls[i].textContent = input;
    });
}

function updateMessage() {
    if(!winner && !tie) {
        messageEl.textContent = `Player (${turn}) turn`;
    } else if(!winner && tie) {
        messageEl.textContent = `It's a tie!`;
    } else {
        messageEl.textContent = `Player (${turn}) Won!`;
        
        // Creating fireworks elements
        beforeEl.classList.add('before');
        afterEl.classList.add('after');

        pyroEl.appendChild(beforeEl);
        pyroEl.appendChild(afterEl);

        beforeEl.textContent = turn;
        afterEl.textContent = turn;

        beforeEl.style.fontSize = "48px";
        afterEl.style.fontSize = "48px";
    }
}

function handleClick(event) {
    const squareIndex = event.target.id;

    if(board[squareIndex] || winner || tie) {
        return;
    }

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();

    console.log(board);
    console.log(winner)
}

function placePiece(index) {
    board[index] = turn;
}

function checkForWinner() {
    if(board[0] === turn && board[1] === turn && board[2] === turn      // First row
        || board[3] === turn && board[4] === turn && board[5] === turn  // Second row
        || board[6] === turn && board[7] === turn && board[8] === turn  // Third row
        || board[0] === turn && board[3] === turn && board[6] === turn  // First Column
        || board[1] === turn && board[4] === turn && board[7] === turn  // Second Column
        || board[2] === turn && board[5] === turn && board[8] === turn  // Third Column
        || board[0] === turn && board[4] === turn && board[8] === turn  // Diagonal from top left to bottom right
        || board[2] === turn && board[4] === turn && board[6] === turn  // Diagonal from top right to bottom left
    ) { 
        winner = true;
    }
}
function checkForTie() {
    let boardCounter = 0;

    if(winner)  {
        return;
    } else { // This will see if the board[] array is full, but still no winner
        board.forEach(value => {
            if(value !== '') {
                ++boardCounter;
                if(boardCounter === 9) {
                    tie = true;
                }
            }
        });
    }
}

function switchPlayerTurn() {
    if(!winner) {
        if(turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
    }
}



/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => { // Clicks on any square of the board to put a value of either X or O
    square.addEventListener('click', handleClick);
});

resetButtonEl.addEventListener('click', () => { // Reset button

    //1. Reset fireworks
    beforeEl.classList.remove('before');
    afterEl.classList.remove('after');
    beforeEl.textContent = '';
    afterEl.textContent = '';

    // Re-initialize
    init();
})



/*------------------------------- Other codes ------------------------------*/
init(); // Clear the board after page loads

