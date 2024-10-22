import { HOST, PORT, SECRET_KEY } from '@common/variable';
import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  HOST,
  PORT,
  SECRET_KEY,
}));
