import { DatabasesService } from '@databases/databases.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { CustomException } from '@/response/custom.exception';
import { PasswordEncoder } from '@util/PasswordEncoder';
import { Logger } from '@util/Logger';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prisma: DatabasesService,
    private readonly logger: Logger,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new CustomException('NotFoundUserError', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = PasswordEncoder.matches(password, user.password);
    if (!isPasswordMatch) {
      throw new CustomException(
        'PasswordNotMatchError',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password: _password, ...result } = user;

    return result;
  }
}
