import { Queue, QueueEvents } from 'bullmq';
import { queueName, connection } from './queue.js';

const queueEvents = new QueueEvents(queueName, { connection });

queueEvents.on('waiting', ({ jobId }) => {
    console.log(`A job with ID ${jobId} is waiting`);
});

queueEvents.on('active', ({ jobId, prev }) => {
    console.log(`Job ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on('completed', async ({ jobId, returnvalue }) => {
    console.log(`${jobId} has completed and returned`);
    console.log(returnvalue);
    const counts = await new Queue(queueName, { connection }).getJobCounts('wait', 'completed', 'failed');
    console.log(counts);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
    console.log(`${jobId} has failed with reason ${failedReason}`);
});