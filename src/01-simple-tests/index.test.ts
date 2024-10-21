// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 1;
    const b = 2;
    const expectedResult = a + b;

    const result = simpleCalculator({ a, b, action: Action.Add });

    expect(result).toBe(expectedResult);
  });

  test('should subtract two numbers', () => {
    const a = 10;
    const b = 5;
    const expectedResult = a - b;

    const result = simpleCalculator({ a, b, action: Action.Subtract });

    expect(result).toBe(expectedResult);
  });

  test('should multiply two numbers', () => {
    const a = 3;
    const b = 2;
    const expectedResult = a * b;

    const result = simpleCalculator({ a, b, action: Action.Multiply });

    expect(result).toBe(expectedResult);
  });

  test('should divide two numbers', () => {
    const a = 10;
    const b = 5;
    const expectedResult = a / b;

    const result = simpleCalculator({ a, b, action: Action.Divide });

    expect(result).toBe(expectedResult);
  });

  test('should exponentiate two numbers', () => {
    const a = 10;
    const b = 5;
    const expectedResult = Math.pow(a, b);

    const result = simpleCalculator({ a, b, action: Action.Exponentiate });

    expect(result).toBe(expectedResult);
  });

  test('should return null for invalid action', () => {
    const a = 10;
    const b = 5;

    const result = simpleCalculator({ a, b, action: 'invalidAction' });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const a = null;
    const b = 5;

    const result = simpleCalculator({ a, b, action: Action.Divide });

    expect(result).toBeNull();
  });
});
