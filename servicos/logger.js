const winston = require('winston');
const fs = require("fs");

if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

module.exports = winston.createLogger({
    level: 'info',
    maxsize: 100000,
    maxFiles: 10,
    transports: [
        new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        })
    ]
});