import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);


export async function rateLimit(key: string, maxRequests: number, duration: number) {
    

    const current = await redis.incr(key);

    if (current === 1) {
        await redis.expire(key, 60);
    }

    return current > 5;  // we will allow max 5 requests per minute

}


export default redis;