import Redis from 'ioredis';
import { RateLimiterRedis} from 'rate-limiter-flexible';

const redisClient = new Redis({
    host: "127.0.0.1",
    port: 6379,
    enableOfflineQueue: false,

})

export const rateLimit = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "login_fail_ip",
    points: 5,
    duration: 60,
})