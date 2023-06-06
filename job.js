import { Queue } from 'bullmq';
import { queueName, connection } from './queue.js';

async function addJobs() {
    const queue = new Queue(queueName, { connection });
    const data = {
        key: 'value'
    }
    const job = await queue.add(
        'JobName',
        data,
        // { removeOnComplete: true }
    );
    console.log(`Job id = ${job.id}`);
    const counts = await queue.getJobCounts('wait', 'completed', 'failed');
    console.log(counts);
    // console.log(job);
    await queue.disconnect();
    await queue.close();
    // queue.clean()
    // queue.drain()
}

await addJobs()