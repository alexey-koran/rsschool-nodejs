import fs from 'node:fs';
import path from 'node:path';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const callBack = () => 'I am callBack!';
const jestCallBack = jest.fn(callBack);

const time = 1000;

describe('doStuffByTimeout', () => {
  let spyTimeout: jest.SpyInstance;

  beforeEach(() => {
    spyTimeout = jest.spyOn(global, 'setTimeout');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callBack, time);

    expect(spyTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callBack, time);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(jestCallBack, time);

    expect(jestCallBack).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time);

    expect(jestCallBack).toHaveBeenCalled();
    expect(jestCallBack).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let spyInterval: jest.SpyInstance;

  beforeEach(() => {
    spyInterval = jest.spyOn(global, 'setInterval');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callBack, time);

    expect(spyInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callBack, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(jestCallBack, time);

    expect(jestCallBack).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time);
    expect(jestCallBack).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(time);
    expect(jestCallBack).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(time);
    expect(jestCallBack).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = `./test.txt`;

  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');

    readFileAsynchronously(pathToFile);

    expect(spyJoin).toHaveBeenCalled();
    expect(spyJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync');

    spyExistsSync.mockReturnValueOnce(false);

    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Test';

    const spyExistsSync = jest.spyOn(fs, 'existsSync');
    const spyReadFile = jest.spyOn(fs.promises, 'readFile');

    spyExistsSync.mockReturnValueOnce(true);

    spyReadFile.mockResolvedValue(fileContent);

    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
