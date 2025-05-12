import axios from 'axios';

jest.mock('axios');

import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

const baseUrl = 'https://jsonplaceholder.typicode.com';
const relativePath = '/users/1';

const mockedResponse = {
  data: {
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
  },
};

describe('throttledGetDataFromApi', () => {
  let mockGet: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockGet = jest.fn().mockResolvedValue(mockedResponse);
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.unmock('axios');
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toStrictEqual(mockedResponse.data);
  });
});
