// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

interface ValidTestCase {
  a: number;
  b: number;
  action: Action;
  expected: number;
}

interface RawTestCase {
  a: unknown;
  b: unknown;
  action: unknown;
  expected: unknown;
}

const calcAddition = (a: number, b: number) => a + b;

const additionTestCases: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Add,
    expected: calcAddition(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Add,
    expected: calcAddition(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Add,
    expected: calcAddition(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Add,
    expected: calcAddition(-5, -6),
  },
];

const calcSubtraction = (a: number, b: number) => a - b;

const subtractionTestCases: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Subtract,
    expected: calcSubtraction(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Subtract,
    expected: calcSubtraction(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Subtract,
    expected: calcSubtraction(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Subtract,
    expected: calcSubtraction(-5, -6),
  },
];

const calcMultiplication = (a: number, b: number) => a * b;

const multiplicationTestCases: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Multiply,
    expected: calcMultiplication(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Multiply,
    expected: calcMultiplication(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Multiply,
    expected: calcMultiplication(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Multiply,
    expected: calcMultiplication(-5, -6),
  },
];

const calcDivision = (a: number, b: number) => a / b;

const divisionTestCases: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Divide,
    expected: calcDivision(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Divide,
    expected: calcDivision(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Divide,
    expected: calcDivision(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Divide,
    expected: calcDivision(-5, -6),
  },
];

const calcExponentiation = (a: number, b: number) => Math.pow(a, b);

const exponentiationTestCases: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Exponentiate,
    expected: calcExponentiation(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Exponentiate,
    expected: calcExponentiation(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Exponentiate,
    expected: calcExponentiation(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Exponentiate,
    expected: calcExponentiation(-5, -6),
  },
];

const invalidTestCases: RawTestCase[] = [
  {
    a: 5,
    b: -1,
    action: 'invalidAction',
    expected: null,
  },
  {
    a: null,
    b: 2,
    action: Action.Add,
    expected: null,
  },
  {
    a: 1,
    b: null,
    action: Action.Add,
    expected: null,
  },
  {
    a: undefined,
    b: 2,
    action: Action.Add,
    expected: null,
  },
  {
    a: 1,
    b: undefined,
    action: Action.Add,
    expected: null,
  },
  {
    a: '1',
    b: 2,
    action: Action.Add,
    expected: null,
  },
  {
    a: 1,
    b: '2',
    action: Action.Add,
    expected: null,
  },
  {
    a: '1',
    b: '2',
    action: Action.Add,
    expected: null,
  },
  {
    a: 'a',
    b: 'b',
    action: Action.Add,
    expected: null,
  },
];

const testCases = [
  ...additionTestCases,
  ...subtractionTestCases,
  ...multiplicationTestCases,
  ...divisionTestCases,
  ...exponentiationTestCases,
  ...invalidTestCases,
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `Test case #$#. Parameters: a = $a, b = $b, action = $action | expected: $expected`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
