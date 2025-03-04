const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
    windowMs : 1 * 6 * 1000, // 1 minute
    max : 5, // 5 requests per minutes
    message : "To many request, please try again later.",
});