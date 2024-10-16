import { HOST, PORT } from '@common/variable';
import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  HOST,
  PORT,
}));
