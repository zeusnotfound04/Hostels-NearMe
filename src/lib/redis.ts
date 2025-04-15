import Redis from 'ioredis';
import { RateLimiterRedis} from 'rate-limiter-flexible';

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const redisClient = new Redis(redisUrl, {
    enableOfflineQueue: false,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export const rateLimit = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "login_fail_ip",
    points: 5,
    duration: 60,
});

export default redisClient; 
