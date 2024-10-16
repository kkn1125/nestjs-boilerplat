import {
  DATABASE_URL,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '@common/variable';
import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  HOST: DB_HOST,
  PORT: DB_PORT,
  USERNAME: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  NAME: DB_NAME,
  URL: DATABASE_URL,
}));
