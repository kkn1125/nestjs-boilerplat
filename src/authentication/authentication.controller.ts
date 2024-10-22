import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignOutDto } from './dto/sign-out.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';
import { EXPIRE_TIME } from '@common/variable';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, jwtToken } =
      await this.authenticationService.signIn(signInDto);

    // 쿠키에 토큰 저장
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: true,
      maxAge: EXPIRE_TIME * 1000, // 1시간
    });

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    const sessionId = user.sessionId;
    await this.authenticationService.signOut(sessionId);

    res.clearCookie('token');
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('validate')
  async validate(@Req() req: Request) {
    return !!req.user;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { userInfo, jwtToken } = await this.authenticationService.refresh(
      req.cookies.token,
    );

    // 쿠키에 토큰 저장
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: true,
      maxAge: EXPIRE_TIME * 1000, // 1시간
    });

    return userInfo;
  }
}
