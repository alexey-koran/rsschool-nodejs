import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const addTwoNumbers = (a: number, b: number) => a + b;

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(
      addTwoNumbers(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Add })).toBe(
      addTwoNumbers(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Add })).toBe(
      addTwoNumbers(6, -5),
    );

    expect(simpleCalculator({ a: -5, b: -6, action: Action.Add })).toBe(
      addTwoNumbers(-5, -6),
    );
  });

  test('should subtract two numbers', () => {
    const subtractTwoNumbers = (a: number, b: number) => a - b;

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(
      subtractTwoNumbers(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Subtract })).toBe(
      subtractTwoNumbers(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Subtract })).toBe(
      subtractTwoNumbers(6, -5),
    );

    expect(simpleCalculator({ a: -5, b: -6, action: Action.Subtract })).toBe(
      subtractTwoNumbers(-5, -6),
    );
  });

  test('should multiply two numbers', () => {
    const multiplyTwoNumbers = (a: number, b: number) => a * b;

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(
      multiplyTwoNumbers(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Multiply })).toBe(
      multiplyTwoNumbers(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Multiply })).toBe(
      multiplyTwoNumbers(6, -5),
    );

    expect(simpleCalculator({ a: -5, b: -6, action: Action.Multiply })).toBe(
      multiplyTwoNumbers(-5, -6),
    );
  });

  test('should divide two numbers', () => {
    const divideTwoNumbers = (a: number, b: number) => a / b;

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(
      divideTwoNumbers(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Divide })).toBe(
      divideTwoNumbers(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Divide })).toBe(
      divideTwoNumbers(6, -5),
    );

    expect(simpleCalculator({ a: -5, b: -6, action: Action.Divide })).toBe(
      divideTwoNumbers(-5, -6),
    );
  });

  test('should exponentiate two numbers', () => {
    const exponentiateTwoNumbers = (a: number, b: number) => Math.pow(a, b);

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      exponentiateTwoNumbers(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Exponentiate })).toBe(
      exponentiateTwoNumbers(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Exponentiate })).toBe(
      exponentiateTwoNumbers(6, -5),
    );

    expect(
      simpleCalculator({ a: -5, b: -6, action: Action.Exponentiate }),
    ).toBe(exponentiateTwoNumbers(-5, -6));
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 1, b: 2, action: 'invalidAction' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: null, b: 2, action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: 1, b: null, action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: undefined, b: 2, action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: 1, b: undefined, action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: '1', b: 2, action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: 1, b: '2', action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: '1', b: '2', action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: 'a', b: 'b', action: Action.Divide }),
    ).toBeNull();
  });
});
