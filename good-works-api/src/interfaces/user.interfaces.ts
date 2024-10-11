export interface IUserCreateDto {
  readonly password: string;
  readonly name: string;
  readonly username: string;
}

export interface IUserUpdateDto {
  readonly password: string;
  readonly name: string;
  readonly username: string;
}

export interface IUserSearchDto {
  readonly term: string;
}

export interface IUser {
  readonly id: number;
  readonly username: string;
  readonly passwordHash: string;
  readonly name: string;
}

export interface ILightUser {
  readonly id: number;
  readonly username: string;
  readonly name: string;
}

