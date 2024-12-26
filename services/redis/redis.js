import redis from 'redis';

const redisClient = redis.createClient({
  url: 'redis://127.0.0.1:6379',
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

// redisClient.connect().catch(err => {
//   console.error('Failed to connect to Redis:', err);
// });

export async function setKeyValue(key, value, expirationInSeconds = 60) {
  try {
    await redisClient.set(key, expirationInSeconds,value);
  } catch (err) {
    console.error('Error setting key in Redis:', err);
  }
}

export async function getKeyValue(key) {
  try {
    const value = await redisClient.get(key);
    return value;
  } catch (err) {
    console.error('Error getting key from Redis:', err);
    return null;
  }
}

