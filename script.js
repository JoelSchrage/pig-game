"use strict";

//
// Selecting elements
//
const player0EL = document.querySelector(`.player--0`);
const player1EL = document.querySelector(`.player--1`);
const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

//
// Starting conditions
//
let scores, currentScore, activePlayer, playing;

//
// Init function
//
const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0EL.classList.remove(`player--winner`);
    player1EL.classList.remove(`player--winner`);
    player1EL.classList.remove(`player--active`);
    player0EL.classList.add(`player--active`);
};

//
// Run init function
//
init();

//
// Switch to next player function
//
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0EL.classList.toggle(`player--active`);
    player1EL.classList.toggle(`player--active`);
};

//
// Rolling dice functionality / Event Listener
//
btnRoll.addEventListener(`click`, () => {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.floor(Math.random() * 6) + 1;
        // 2. Display dice
        diceEl.classList.remove(`hidden`);
        diceEl.src = `./src/img/dice-${dice}.png`;
        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

//
// Hold points functionality / Event Listener
//
btnHold.addEventListener(`click`, () => {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finisch the game
            playing = false;
            diceEl.classList.add(`hidden`);
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add(`player--winner`);
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove(`player--active`);
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

//
// New game functionality / Event Listener
//
btnNew.addEventListener(`click`, () => {
    init();
});
