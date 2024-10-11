import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthDto, IAuthRefreshDto } from '../../interfaces/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() userCreate: IAuthDto) {
    return await this.authService.authenticate(userCreate);
  }

  @Post('refresh')
  async refresh(@Body() refresh: IAuthRefreshDto) {
    return await this.authService.refresh(refresh.refreshToken);
  }
}
