import Redis from 'ioredis';

// Setting up Redis connection using environment variables
const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

export default redis;
