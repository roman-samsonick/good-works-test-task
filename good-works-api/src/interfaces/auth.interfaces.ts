export interface IAuthDto {
  username: string,
  password: string
}

export interface IAuthRefreshDto {
  refreshToken: string
}

export interface IAccessTokenPayload {
  id: number;
}

export interface IAuthTokensDto {
  readonly accessToken: string;
  readonly refreshToken: string;
}