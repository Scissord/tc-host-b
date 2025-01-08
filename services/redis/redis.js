import redis from 'redis';


export const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

export async function setKeyValue(key, value, expirationInSeconds = null) {
  try {
    if (value === null) {
      await redisClient.del(key);
    } else {
      expirationInSeconds
        ? await redisClient.setEx(key, expirationInSeconds, value)
        : await redisClient.set(key, value);
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
