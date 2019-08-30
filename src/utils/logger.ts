import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: './log/pretty.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata(),
        winston.format.json(),
      ),
      handleExceptions: true,
    }),
    new winston.transports.File({ filename: './log/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: './log/error.log', level: 'error' }),
    new winston.transports.File({ filename: './log/fatal.log', level: 'fatal' }),
    new winston.transports.File({ filename: './log/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf((info): string => `${info.timestamp} [${info.level}]: ${info.message}`),
    ),
  }));
}

export default logger;
