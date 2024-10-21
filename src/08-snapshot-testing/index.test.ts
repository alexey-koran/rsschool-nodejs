// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const firstValues = [1, 2, 3, 4, 5];
const secondValues = [6, 7, 8, 9, 10];

const expectedFirstLinkedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: 5,
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  const firstLinkedList = generateLinkedList<number>(firstValues);
  const secondLinkedList = generateLinkedList<number>(secondValues);

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(firstLinkedList).toStrictEqual(expectedFirstLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(secondLinkedList).toMatchSnapshot('secondLinkedList');
  });
});
