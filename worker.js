import { Queue } from 'bullmq';
import { setTimeout } from 'timers/promises';
import { Worker } from 'bullmq';
import { queueName, connection } from './queue.js';

const concurrency = 5;

console.log(`Starting the Queue ${queueName}...`)
const queue = new Queue(queueName, { connection });

console.log(`Starting the worker of the Queue ${queueName}...`)
const worker = new Worker(queueName, async job => {
  console.time('worker-start')
  console.log('Worker says: Oh my queen!', job.data);
  await setTimeout(5000);
  console.timeEnd('worker-start')
  return {
    hi: 'baby'
  }
}, { connection, concurrency });

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});