const { test } = require("node:test");
const assert = require("node:assert/strict");

function _calc(a, b, o = "+") {
  switch(o) {
    case "-": return a - b;
    case "x":
    case "*": return a * b;
    case "/": return a / b;
    case "%": return a % b;

    case "+":
    default: return a + b;
  }
}

const caculator = {
  add(a, b) {
    return _calc(a, b, "+");
  },

  mul(a, b) {
    return _calc(a, b, "*");
  },

  div(a, b) {
    return _calc(a, b, "/");
  },

  sub(a, b) {
    return _calc(a, b, "-");
  },

  mod(a, b) {
    return _calc(a, b, "%");
  }
}

const testCases = [
  [caculator.add(5, 6), _calc(5, 6), "Is caculator.add(5, 6) equal to _calc(5, 6)", "caculator.add(5, 6) isn't equal to _calc(5, 6)"],
  [caculator.mul(12, 32), _calc(12, 32, "x"), "Is caculator.mul(12, 32) equal to _calc(12, 32, \"x\")", "caculator.mul(12, 32) isn't equal to _calc(12, 32, \"x\")"],
  [caculator.sub(7, 6) >= 1, true, "Is caculator.sub(7, 6) greater than or equal to 1", "caculator.sub(7, 6) isn't greater than 1"],
];

for (let testCase of testCases) {
  let [_test, result, describe, messageError] = testCase;
  test(describe, async () => {
    assert(_test, result, messageError);
  });
}