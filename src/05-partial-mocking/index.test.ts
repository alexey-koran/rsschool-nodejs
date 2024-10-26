import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  const { mockOne, mockTwo, mockThree } = originalModule;

  const mockFnOne = jest.fn(mockOne).mockImplementation(() => void 0);
  const mockFnTwo = jest.fn(mockTwo).mockImplementation(() => void 0);
  const mockFnThree = jest.fn(mockThree).mockImplementation(() => void 0);

  return {
    ...originalModule,
    mockOne: mockFnOne,
    mockTwo: mockFnTwo,
    mockThree: mockFnThree,
  };
});

describe('partial mocking', () => {
  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(spyConsoleLog).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');
    const unmockedText = 'I am not mocked';

    unmockedFunction();

    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog).toHaveBeenCalledWith(unmockedText);
  });

  afterAll(() => {
    jest.unmock('./index');
  });
});
