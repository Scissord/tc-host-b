import redis from 'redis';

const redisClient = redis.createClient({
  url: process.env.NODE_ENV === 'production'
  ? 'redis://127.0.0.1:6379'
  : `redis://${process.env.SERVER_IP}:6379`,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

redisClient.connect().catch(err => {
  console.error('Failed to connect to Redis:', err);
});

export default redisClient;
