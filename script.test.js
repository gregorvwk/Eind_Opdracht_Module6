const [
  wordpicker,
  isWordGuessed,
  isLetterWrong,
  theWord,
  winOrLoseTheGame,
  updateTries,
] = require("./script.js");

test("sould pick a word", () => {
  const wordList = ["vis", "snoer"];
  expect(wordpicker(wordList)).not.toBe("");
});
test("should check if the word contains the guessed letter", () => {
  expect(isLetterWrong(["vis"], ["x"])).toMatchObject(["x"]);
});
test("should check if word is guessed", () => {
  expect(isWordGuessed(["vis"], ["vis"])).toBe(true);
});
test("should display guessed letters", () => {
  expect(theWord(["vis"], ["x"])).toMatchObject(["_"]);
});
test("Should win the game", () => {
  expect(winOrLoseTheGame()).toBe(true);
});
test("Should lose the game", () => {
  expect(winOrLoseTheGame()).toBe(true);
});
test("should show the amount of tries", () => {
  expect(updateTries()).toBe(0);
});
