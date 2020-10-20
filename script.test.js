const [
  wordpicker,
  isWordGuessed,
  isLetterWrong,
  theWord,
  winOrLoseTheGame,
  updateTries,
  getGameResult
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
  expect(getGameResult("vis".split(""), ["v", "i", "s"])).toBe("Win");
  expect(getGameResult("vis".split(""), ["v", "s", "i"])).toBe("Win");
  expect(getGameResult("vis".split(""), ["z", "v", "q", "i", "s"])).toBe("Win");
});
test("If tries is greater of equal to 5, lose the game", () => {
    expect(getGameResult("vis".split(""), ["v", "x", "s", "q", "l", "h", "p"])).toBe("Lose");
    expect(getGameResult("vis".split(""), ["x", "q", "l", "h", "p"])).toBe("Lose");
    expect(getGameResult("vis".split(""), ["v", "v", "v", "x", "s", "q", "l", "h", "p"])).toBe("Lose");
});
test("should check how many tries are left", () => {
  expect(updateTries()).toBe(4);
});
