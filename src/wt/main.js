import { availableParallelism } from 'node:os';
import { join } from 'node:path';
import { Worker } from 'node:worker_threads';

const START_COUNT = 10;

const performCalculations = async () => {
  const cpuCoresCount = availableParallelism();
  const workersPromises = [];

  for (let i = 0; i < cpuCoresCount; i += 1) {
    const workerPromise = new Promise((resolve, reject) => {
      const newWorker = new Worker(join(import.meta.dirname, 'worker.js'), {
        workerData: { n: START_COUNT + i },
      });

      newWorker.on('message', (message) => {
        if (message?.data !== null) {
          resolve({ status: 'resolved', data: message.data });
        }
      });

      newWorker.on('error', (err) => {
        reject(err);
      });

      newWorker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });

    workersPromises.push(workerPromise);
  }

  const workersResults = await Promise.allSettled(workersPromises);

  console.log(
    workersResults.map((promiseResult) => {
      if (promiseResult.status === 'rejected') {
        return {
          status: 'error',
          data: null,
        };
      }

      return promiseResult.value;
    }),
  );
};

await performCalculations();
