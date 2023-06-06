import IORedis from 'ioredis';

const queueName = `my-queen`;

const connection = new IORedis({
    maxRetriesPerRequest: null
});

export { queueName, connection }