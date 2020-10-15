const startTheGame = document.getElementById("start_game");
const gameLine = document.getElementById("line_game");
const inputLetter = document.querySelector(".guess_input-container");
const lettersQuessed = document.querySelector(".letters_guessed-container");
const wrongLetters = document.querySelector(".wrong_letters-container");
const restartbtn = document.querySelector(".restart");
let inputGuessLetter = document.querySelector("input");
const guessBtn = document.querySelector(".guess");
const winGame = document.querySelector(".win");
const loseGame = document.querySelector(".lose");
const wordToGuess = document.querySelector(".the_word");
const guessedWrongLetters = document.querySelector(".guessed_letters");
const livesCounter = document.querySelector(".lives span");
const showWordOnLose = document.querySelector(".lose p span");

document.addEventListener("DOMContentLoaded", function () {
  startTheGame.addEventListener("click", async function () {
    startTheGame.style.transition = "all 500ms ease-in-out";
    startTheGame.style.opacity = "0";
    await new Promise((r) => setTimeout(r, 500));
    startTheGame.style.display = "none";
    gameLine.style.display = "block";
    gameLine.style.transition = "all 3000ms ease-in-out";
    await new Promise((r) => setTimeout(r, 500));
    gameLine.className = "line_game";
    gameStartanimations(inputLetter);
    gameStartanimations(lettersQuessed);
    gameStartanimations(wrongLetters);
  });
});
const gameStartanimations = async function (selector) {
  selector.style.display = "block";
  selector.style.opacity = "0";
  await new Promise((r) => setTimeout(r, 3500));
  selector.style.transition = "all 1000ms ease-out";
  selector.style.opacity = "100%";
};

const wordList = [
  "vis",
  "toeter",
  "developer",
  "telefoon",
  "moeder",
  "snoer",
  "geeuw",
];

let word;
const wordpicker = function (list) {
  let index = Math.floor(Math.random() * list.length);
  console.log("The word is: " + list[index]);
  return list[index];
};

let inputs;
const isWordGuessed = function (word, inputs) {
  let remaining = word.filter(function (letter) {
    return !inputs.includes(letter);
  });
  return remaining.length === 0;
};

const winOrLoseTheGameAnimation = function (gameWinLose) {
  if (gameWinLose === winGame) {
    gameWinLose.style.transform = "translateY(30rem)";
    lettersQuessed.style.transition = "all 2000ms ease-in-out";
    lettersQuessed.style.background = "lightgreen";
    wrongLetters.style.transition = "all 2000ms ease-in-out";
    wrongLetters.style.background = "lightgreen";
    console.log("win");
  } else {
    gameWinLose.style.transform = "translateY(30rem)";
    lettersQuessed.style.transition = "all 2000ms ease-in-out";
    lettersQuessed.style.background = "lightpink";
    wrongLetters.style.transition = "all 2000ms ease-in-out";
    wrongLetters.style.background = "lightpink";
    console.log("lose");
  }
  restartbtn.style.display = "block";
};

let gameOver;
const winOrLoseTheGame = function () {
  gameOver = true;
  return gameOver;
};

const isLetterWrong = function (word, inputs) {
  let wrongLetters = inputs.filter(function (letter) {
    return !word.includes(letter);
  });
  return wrongLetters;
};

const theWord = function (word, inputLetterWords) {
  let display = word.map(function (letter) {
    if (inputLetterWords.includes(letter)) {
      return letter;
    } else {
      return "_";
    }
  });
  return display;
};

let tries = 0;
const updateTries = function () {
  return tries++;
};

const guessLetter = function () {
  if (gameOver) {
    return;
  }
  let inputGuessLetter = document.querySelector("input").value;
  document.querySelector("input").value = "";
  if (inputs.includes(inputGuessLetter) || inputGuessLetter === "") {
    return;
  }
  if (!word.includes(inputGuessLetter)) {
    updateTries();
    livesCounter.innerHTML = 5 - tries;
  }
  inputs.push(inputGuessLetter);
  let wordIncludesLetter = theWord(word, inputs);
  wordToGuess.innerHTML = wordIncludesLetter.join(" ");
  let resultWrongLetters = isLetterWrong(word, inputs);
  guessedWrongLetters.innerHTML = resultWrongLetters.join(" ");
  if (isWordGuessed(word, inputs)) {
    winOrLoseTheGame();
    winOrLoseTheGameAnimation(winGame);
  } else if (tries >= 5) {
    winOrLoseTheGame();
    winOrLoseTheGameAnimation(loseGame);
  }
};

function beginTheGameWithPlayer() {
  gameOver = false;
  restartbtn.style.display = "none";
  inputGuessLetter.value = "";
  winGame.style.transform = "translateY(-30rem)";
  loseGame.style.transform = "translateY(-30rem)";
  word = wordpicker(wordList).split("");
  showWordOnLose.innerHTML = `"${word.join("")}"`;
  livesCounter.innerHTML = 5;
  inputs = [];
  let clearCurrentWord = theWord(word, inputs);
  wordToGuess.innerHTML = clearCurrentWord.join(" ");
  let clearWrongLetters = isLetterWrong(word, inputs);
  guessedWrongLetters.innerHTML = clearWrongLetters.join(" ");
  lettersQuessed.style.transition = "all 2000ms ease-in-out";
  lettersQuessed.style.background = "white";
  wrongLetters.style.transition = "all 2000ms ease-in-out";
  wrongLetters.style.background = "white";
}

document.addEventListener("DOMContentLoaded", function () {
  beginTheGameWithPlayer();
  guessBtn.addEventListener("click", guessLetter);
  restartbtn.addEventListener("click", beginTheGameWithPlayer);
});

module.exports = [
  wordpicker,
  isWordGuessed,
  isLetterWrong,
  theWord,
  winOrLoseTheGame,
  updateTries,
];
