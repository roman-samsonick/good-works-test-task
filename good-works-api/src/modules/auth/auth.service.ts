import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AppError, EAppError } from '../../utils/errorUtils';
import { HashService } from '../hash/hash.service';
import { IAccessTokenPayload, IAuthDto, IAuthTokensDto } from '../../interfaces/auth.interfaces';
import { JwtService } from '@nestjs/jwt';

interface IRefreshTokenPayload {
  id: number;
  refresh: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {
  }

  private createAccessTokenPayload(id: number): IAccessTokenPayload {
    return {
      id,
    };
  }

  private createRefreshTokenPayload(id: number): IRefreshTokenPayload {
    return {
      id,
      refresh: true
    };
  }

  private async createAccessToken(id: number): Promise<string> {
    return await this.jwtService.signAsync(this.createAccessTokenPayload(id), {
      expiresIn: '20h',
    })
  }

  private async createTokens(id: number): Promise<IAuthTokensDto> {
    return {
      accessToken: await this.createAccessToken(id),
      refreshToken: await this.jwtService.signAsync(this.createRefreshTokenPayload(id), {
        expiresIn: '90d'
      }),
    }
  }

  async verifyAccessToken(accessToken: string): Promise<IAccessTokenPayload> {
    return await this.extractTokenData(accessToken)
  }

  private async extractTokenData<T>(token: string): Promise<T> {
    try {
      return await this.jwtService.verifyAsync(token) as T
    } catch (e) {
      throw new AppError(EAppError.INVALID_TOKEN)
    }
  }

  async refresh(refreshToken: string) {
    const data = await this.extractTokenData<IRefreshTokenPayload>(refreshToken);

    if (!data.refresh || !data.id) {
      throw new AppError(EAppError.INVALID_TOKEN);
    }

    return {
      accessToken: await this.createAccessToken(data.id)
    }
  }

  async authenticate({ username, password }: IAuthDto): Promise<IAuthTokensDto> {
    const user = await this.userService.findUserByUsername(username);

    if (!user) {
      throw new AppError(EAppError.INVALID_CREDENTIALS);
    }

    if (!await this.hashService.check(user.passwordHash, password)) {
      throw new AppError(EAppError.INVALID_CREDENTIALS);
    }

    return this.createTokens(user.id);
  }
}
