const { getCache, setCache } = require('../config/redis');

// Cache middleware factory
const cacheMiddleware = (keyPrefix, ttlSeconds = 300) => {
    return async (req, res, next) => {
        // Generate cache key from request
        const cacheKey = `${keyPrefix}:${JSON.stringify(req.query)}`;

        try {
            const cachedData = await getCache(cacheKey);

            if (cachedData) {
                return res.json({
                    success: true,
                    fromCache: true,
                    ...cachedData
                });
            }

            // Store original res.json to intercept response
            const originalJson = res.json.bind(res);
            res.json = async (data) => {
                // Only cache successful responses
                if (data.success) {
                    await setCache(cacheKey, data, ttlSeconds);
                }
                return originalJson(data);
            };

            next();
        } catch (error) {
            // If cache fails, continue without caching
            next();
        }
    };
};

// Specific cache middlewares
const cachePapersList = cacheMiddleware('papers:list', 300); // 5 minutes
const cachePopular = cacheMiddleware('papers:popular', 600); // 10 minutes
const cacheSearch = cacheMiddleware('search', 120); // 2 minutes

module.exports = {
    cacheMiddleware,
    cachePapersList,
    cachePopular,
    cacheSearch
};
