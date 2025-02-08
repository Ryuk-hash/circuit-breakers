const Redis = require('ioredis');

const redisConfig = {
  host: process.env.REDIS_ENDPOINT,
  port: process.env.REDIS_PORT,
  retryStrategy: (times) => Math.min(times * 50, 2000), // Retry delay
};

const pubClient = new Redis(redisConfig); // Publisher
const subClient = new Redis(redisConfig); // Subscriber

pubClient.on('connect', () => console.log('🔗 Connected to Redis (Publisher)!'));
pubClient.on('error', (err) => console.error('❌ Redis Publisher error:', err));

subClient.on('connect', () => console.log('🔗 Connected to Redis (Subscriber)!'));
subClient.on('error', (err) => console.error('❌ Redis Subscriber error:', err));

module.exports = { pubClient, subClient };
