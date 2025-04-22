import { parentPort, workerData } from 'node:worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
  if (workerData?.n) {
    parentPort.postMessage({ data: nthFibonacci(workerData.n) });
  } else {
    throw new Error('n is not specified');
  }
};

sendResult();
