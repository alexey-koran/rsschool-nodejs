// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const mockedUrl = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/users/1';

  const mockedResponse = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  };

  beforeEach(() => {
    jest.runOnlyPendingTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spyAxiosCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);

    expect(spyAxiosCreate).toHaveBeenCalledWith({ baseURL: mockedUrl });
  });

  test('should perform request to correct provided url', async () => {
    const spyAxiosGet = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(relativePath);

    expect(spyAxiosGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    expect(throttledGetDataFromApi(relativePath)).resolves.toEqual(
      mockedResponse,
    );
  });
});
