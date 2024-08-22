"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let curretnScore, activePlayer, playing, score;

const newGame = function () {
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  activePlayer = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  curretnScore = 0;
  score = [0, 0];
  playing = true;

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
};

newGame();

const newPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  curretnScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      curretnScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        curretnScore;
    } else {
      newPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += curretnScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceEl.classList.add("hidden");
      playing = false;
    } else {
      newPlayer();
    }
  }
});

btnNew.addEventListener("click", newGame);
