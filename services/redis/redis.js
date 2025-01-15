import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();

export const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected.');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

export async function setKeyValue(key, value, expirationInSeconds = null) {
  const serializedValue = JSON.stringify(value);
  try {
    if (value === null) {
      await redisClient.del(key);
    } else {
      expirationInSeconds
        ? await redisClient.setEx(key, expirationInSeconds, serializedValue)
        : await redisClient.set(key, serializedValue);
    }
  } catch (err) {
    console.error('Error setting key in Redis:', err);
  }
};

export async function getKeyValue(key) {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error('Error getting key from Redis:', err);
    return null;
  }
};
