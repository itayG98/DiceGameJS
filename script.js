'use strict';
//selecting elements
const score0Elm = document.getElementById('score--0');
const score1Elm = document.getElementById('score--1');
const current0Elm = document.getElementById('current--0');
const current1Elm = document.getElementById('current--1');
const diceElm = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerSec0 = document.querySelector('.player--0');
const playerSec1 = document.querySelector('.player--1');
const WineryScore = 75;
//Starting conditionals
const scores = [0, 0];
let dice = 0;
let current = 0;
let currentPlayer = 0;

btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', newGame);

const win = player => {
  document.querySelector(`.player--${player}`).classList.add('player--winner');
  document.getElementById(`name--${player}`).classList.add('player--winner');
  diceElm.classList.add('hidden');
};

const updateCurrent = () => {
  document.getElementById(`current--${currentPlayer}`).innerHTML = current;
};

const upDateScoresText = () => {
  document.getElementById(`score--${currentPlayer}`).innerHTML =
    scores[currentPlayer];
  let other = currentPlayer == 0 ? 1 : 0;
  document.getElementById(`score--${other}`).innerHTML = scores[other];
};

function changePlayer() {
  current = 0;
  updateCurrent();
  playerSec0.classList.toggle('player--active');
  playerSec1.classList.toggle('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  current = 0;
  updateCurrent();
}

function hold() {
  if (scores[0] < WineryScore && scores[1] < WineryScore) {
    scores[currentPlayer] += current;
    if (scores[currentPlayer] >= WineryScore) {
      win(currentPlayer);
    }
    upDateScoresText();
    changePlayer();
  }
}

function rollDice() {
  if (scores[0] < WineryScore && scores[1] < WineryScore) {
    dice = Math.trunc(Math.random() * 6) + 1;
    diceElm.src = `dice-${dice}.png`;
    if (dice !== 1) {
      current += dice;
      updateCurrent();
    } else {
      current = 0;
      updateCurrent();
      changePlayer();
    }
  }
}

function newGame() {
  if (scores[0] > WineryScore) {
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.getElementById(`name--0`).classList.remove('player--winner');
  } else if (scores[1] > WineryScore) {
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.getElementById(`name--1`).classList.remove('player--winner');
  }
  scores[0] =
    scores[1] =
    dice =
    current =
    current0Elm.innerHTML =
    current1Elm.innerHTML =
      0;
  upDateScoresText();
  currentPlayer = 1;
  changePlayer();
}
