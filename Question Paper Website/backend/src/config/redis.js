const { Redis } = require('@upstash/redis');

let redis = null;
let isConnected = false;

const connectRedis = async () => {
    try {
        // Check if Upstash environment variables are set
        if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
            console.log('Upstash Redis credentials not configured. Running without cache.');
            return;
        }

        redis = Redis.fromEnv();

        // Test connection
        await redis.set('connection_test', 'ok');
        const test = await redis.get('connection_test');

        if (test === 'ok') {
            isConnected = true;
            console.log('Upstash Redis Connected');
        }
    } catch (error) {
        console.error('Upstash Redis connection failed:', error.message);
        // Continue without Redis - app will work but without caching
        isConnected = false;
    }
};

const getRedisClient = () => redis;

const isRedisConnected = () => isConnected;

// Cache helpers
const setCache = async (key, value, ttlSeconds = 300) => {
    if (!redis || !isConnected) return;
    try {
        await redis.setex(key, ttlSeconds, JSON.stringify(value));
    } catch (error) {
        console.error('Redis set error:', error);
    }
};

const getCache = async (key) => {
    if (!redis || !isConnected) return null;
    try {
        const data = await redis.get(key);
        // Upstash auto-parses JSON, but we stored as string
        if (typeof data === 'string') {
            return JSON.parse(data);
        }
        return data;
    } catch (error) {
        console.error('Redis get error:', error);
        return null;
    }
};

const deleteCache = async (key) => {
    if (!redis || !isConnected) return;
    try {
        await redis.del(key);
    } catch (error) {
        console.error('Redis delete error:', error);
    }
};

const clearCachePattern = async (pattern) => {
    if (!redis || !isConnected) return;
    try {
        // Upstash supports SCAN for pattern matching
        const keys = [];
        let cursor = 0;

        do {
            const result = await redis.scan(cursor, { match: pattern, count: 100 });
            cursor = result[0];
            keys.push(...result[1]);
        } while (cursor !== 0);

        if (keys.length > 0) {
            await redis.del(...keys);
        }
    } catch (error) {
        console.error('Redis clear pattern error:', error);
    }
};

module.exports = {
    connectRedis,
    getRedisClient,
    isRedisConnected,
    setCache,
    getCache,
    deleteCache,
    clearCachePattern
};
