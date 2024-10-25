import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

import lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 1000;

  let firstBankAccount: BankAccount;
  let secondBankAccount: BankAccount;

  beforeEach(() => {
    firstBankAccount = getBankAccount(initialBalance);
    secondBankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(firstBankAccount).toBeInstanceOf(BankAccount);
    expect(firstBankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => firstBankAccount.withdraw(initialBalance * 5)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      firstBankAccount.transfer(initialBalance * 5, secondBankAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      firstBankAccount.transfer(initialBalance * 5, firstBankAccount),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const currentBalance = firstBankAccount.getBalance();

    const deposit = 100;

    expect(firstBankAccount.deposit(deposit).getBalance()).toBe(
      currentBalance + deposit,
    );
  });

  test('should withdraw money', () => {
    const currentBalance = firstBankAccount.getBalance();

    const withdrawAmount = 100;

    expect(firstBankAccount.withdraw(withdrawAmount).getBalance()).toBe(
      currentBalance - withdrawAmount,
    );
  });

  test('should transfer money', () => {
    const firstAccountBalance = firstBankAccount.getBalance();
    const secondAccountBalance = secondBankAccount.getBalance();

    const transferAmount = 100;

    firstBankAccount.transfer(transferAmount, secondBankAccount);

    expect(firstBankAccount.getBalance()).toBe(
      firstAccountBalance - transferAmount,
    );

    expect(secondBankAccount.getBalance()).toBe(
      secondAccountBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 100;
    const requestFailed = 1;

    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(balance)
      .mockReturnValueOnce(requestFailed);

    const fetchedBalance = await firstBankAccount.fetchBalance();

    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toBe(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 100;

    jest.spyOn(firstBankAccount, 'fetchBalance').mockResolvedValueOnce(balance);

    expect(firstBankAccount.getBalance()).toBe(initialBalance);

    await firstBankAccount.synchronizeBalance();

    expect(firstBankAccount.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(firstBankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    expect(firstBankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
