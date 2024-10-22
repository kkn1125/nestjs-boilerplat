import * as path from 'path';
import * as dotenv from 'dotenv';

export const MODE = process.env.NODE_ENV || 'production';

dotenv.config({
  path: path.join(path.resolve(), '.env'),
});
dotenv.config({
  path: path.join(path.resolve(), `.env.${MODE}`),
});

/* server info */
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const SECRET_KEY = process.env.SECRET_KEY;

/* database info */
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME || 'boilerplate';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DATABASE_URL = process.env.DATABASE_URL;

export const TIMESTAMP_FORMAT = 'HH:mm:ss.SSS';

/* redis info */
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = +(process.env.REDIS_PORT || 6379);
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '1234';
export const EXPIRE_TIME = 3600; // 1시간
