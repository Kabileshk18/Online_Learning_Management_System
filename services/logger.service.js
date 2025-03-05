const winston = require('winston');

const logger = winston.createLogger({
    level: 'error', // Log levels: error, warn, info, http, verbose, debug, silly
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'logs/app.log' }) // Log to file
    ]
});

module.exports = logger;