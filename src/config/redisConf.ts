import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@common/variable';
import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  HOST: REDIS_HOST,
  PORT: REDIS_PORT,
  PASSWORD: REDIS_PASSWORD,
}));
