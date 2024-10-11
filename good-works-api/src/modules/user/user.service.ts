import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import { ILightUser, IUser, IUserCreateDto, IUserUpdateDto } from '../../interfaces/user.interfaces';
import { User } from '../../models/user.model';

import { AppError, EAppError } from '../../utils/errorUtils';
import { HashService } from '../hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
    private readonly hashService: HashService,
  ) {
  }

  private mapToLightUser(user: User): ILightUser {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
    }
  }

  async getManyByIds(ids: number[]): Promise<ILightUser[]> {
    const users = await this.userModel.find({
      where: {
        id: In(ids)
      }
    })

    return users.map(this.mapToLightUser)
  }

  async assertUserExists(id: number): Promise<void> {
    const user = await this.getLightUserById(id)

    if (!user) {
      throw new AppError(EAppError.USER_NOT_EXIST)
    }
  }

  async getLightUserById(id: number): Promise<ILightUser> {
    const user = await this.userModel.findOne({
      where: { id },
    });

    if (!user) {
      return undefined;
    }

    return this.mapToLightUser(user);
  }

  async findUserByUsername(username: string): Promise<IUser | undefined> {
    const user = await this.userModel.findOne({ where: { username } });

    if (!user) {
      return undefined;
    }

    return {
      id: user.id,
      name: user.name,
      passwordHash: user.passwordHash,
      username: user.username,
    };
  }

  async createUser(userCreateDto: IUserCreateDto) {
    const alreadyExists = await this.userModel.findOne({ where: { username: userCreateDto.username } });

    if (alreadyExists) {
      throw new AppError(EAppError.USER_ALREADY_EXISTS);
    }

    const user = new User();
    user.name = userCreateDto.name
    user.passwordHash = await this.hashService.createHash(userCreateDto.password)
    user.username = userCreateDto.username

    await this.userModel.save(user)

    return this.mapToLightUser(user);
  }

  async getAllDev() {
    const users=  await this.userModel.find();

    return users.map(this.mapToLightUser)
  }

  async update(userId: number, update: IUserUpdateDto) {
    const user = await this.userModel.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError(EAppError.USER_NOT_EXIST)
    }

    user.username = update.username ?? user.username;
    user.name = update.name ?? user.username;

    if (update.password) {
      user.passwordHash = await this.hashService.createHash(update.password)
    }

    await this.userModel.save(user)

    return this.mapToLightUser(user);
  }

  async remove(userId: number) {
    const user = await this.userModel.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError(EAppError.USER_NOT_EXIST)
    }

    await this.userModel.remove(user)
  }

  async search(userId: number, term: string): Promise<ILightUser[]> {
    const users = await this.userModel.find({
      where: {
        id: Not(userId),
        username: Like(`%${term.trim().toLocaleLowerCase()}%`),
      }
    })

    return users.map(this.mapToLightUser);
  }
}

