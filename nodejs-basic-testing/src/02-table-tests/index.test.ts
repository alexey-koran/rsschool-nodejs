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

const addTwoNumbers = (a: number, b: number) => a + b;

const addOperationTests: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Add,
    expected: addTwoNumbers(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Add,
    expected: addTwoNumbers(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Add,
    expected: addTwoNumbers(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Add,
    expected: addTwoNumbers(-5, -6),
  },
];

const subtractTwoNumbers = (a: number, b: number) => a - b;

const subtractOperationTests: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Subtract,
    expected: subtractTwoNumbers(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Subtract,
    expected: subtractTwoNumbers(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Subtract,
    expected: subtractTwoNumbers(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Subtract,
    expected: subtractTwoNumbers(-5, -6),
  },
];

const multiplyTwoNumbers = (a: number, b: number) => a * b;

const multiplyOperationTests: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Multiply,
    expected: multiplyTwoNumbers(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Multiply,
    expected: multiplyTwoNumbers(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Multiply,
    expected: multiplyTwoNumbers(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Multiply,
    expected: multiplyTwoNumbers(-5, -6),
  },
];

const divideTwoNumbers = (a: number, b: number) => a / b;

const divideOperationTests: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Divide,
    expected: divideTwoNumbers(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Divide,
    expected: divideTwoNumbers(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Divide,
    expected: divideTwoNumbers(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Divide,
    expected: divideTwoNumbers(-5, -6),
  },
];

const powerTwoNumbers = (a: number, b: number) => Math.pow(a, b);

const powerOperationTests: ValidTestCase[] = [
  {
    a: 1,
    b: 2,
    action: Action.Exponentiate,
    expected: powerTwoNumbers(1, 2),
  },
  {
    a: -5,
    b: 6,
    action: Action.Exponentiate,
    expected: powerTwoNumbers(-5, 6),
  },
  {
    a: 6,
    b: -5,
    action: Action.Exponentiate,
    expected: powerTwoNumbers(6, -5),
  },
  {
    a: -5,
    b: -6,
    action: Action.Exponentiate,
    expected: powerTwoNumbers(-5, -6),
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
  ...addOperationTests,
  ...subtractOperationTests,
  ...multiplyOperationTests,
  ...divideOperationTests,
  ...powerOperationTests,
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
