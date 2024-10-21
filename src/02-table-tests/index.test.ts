// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 20, b: 30, action: Action.Subtract, expected: -10 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: -2, action: Action.Multiply, expected: -4 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 4, action: Action.Divide, expected: 0.5 },
  { a: 10, b: -5, action: Action.Divide, expected: -2 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 5, b: 1, action: Action.Exponentiate, expected: 5 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 5, b: -1, action: Action.Exponentiate, expected: 0.2 },
  { a: 5, b: -1, action: 'invalidAction', expected: null },
  { a: 'invalidArgument', b: -1, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `Test case #$#. Parameters: a = $a, b = $b, action = $action | expected: $expected`,
    (testCase) => {
      expect(simpleCalculator(testCase)).toBe(testCase.expected);
    },
  );
});
