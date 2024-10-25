import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const getExpectedResult = (a: number, b: number) => a + b;

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(
      getExpectedResult(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Add })).toBe(
      getExpectedResult(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Add })).toBe(
      getExpectedResult(6, -5),
    );

    expect(simpleCalculator({ a: -5, b: -6, action: Action.Add })).toBe(
      getExpectedResult(-5, -6),
    );
  });

  test('should subtract two numbers', () => {
    const getExpectedResult = (a: number, b: number) => a - b;

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(
      getExpectedResult(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Subtract })).toBe(
      getExpectedResult(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Subtract })).toBe(
      getExpectedResult(6, -5),
    );

    expect(simpleCalculator({ a: -5, b: -6, action: Action.Subtract })).toBe(
      getExpectedResult(-5, -6),
    );
  });

  test('should multiply two numbers', () => {
    const getExpectedResult = (a: number, b: number) => a * b;

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(
      getExpectedResult(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Multiply })).toBe(
      getExpectedResult(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Multiply })).toBe(
      getExpectedResult(6, -5),
    );

    expect(simpleCalculator({ a: -5, b: -6, action: Action.Multiply })).toBe(
      getExpectedResult(-5, -6),
    );
  });

  test('should divide two numbers', () => {
    const getExpectedResult = (a: number, b: number) => a / b;

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(
      getExpectedResult(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Divide })).toBe(
      getExpectedResult(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Divide })).toBe(
      getExpectedResult(6, -5),
    );

    expect(simpleCalculator({ a: -5, b: -6, action: Action.Divide })).toBe(
      getExpectedResult(-5, -6),
    );
  });

  test('should exponentiate two numbers', () => {
    const getExpectedResult = (a: number, b: number) => Math.pow(a, b);

    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      getExpectedResult(1, 2),
    );

    expect(simpleCalculator({ a: -5, b: 6, action: Action.Exponentiate })).toBe(
      getExpectedResult(-5, 6),
    );

    expect(simpleCalculator({ a: 6, b: -5, action: Action.Exponentiate })).toBe(
      getExpectedResult(6, -5),
    );

    expect(
      simpleCalculator({ a: -5, b: -6, action: Action.Exponentiate }),
    ).toBe(getExpectedResult(-5, -6));
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
      simpleCalculator({ a: '1', b: '2', action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: 'a', b: 'b', action: Action.Divide }),
    ).toBeNull();
  });
});
