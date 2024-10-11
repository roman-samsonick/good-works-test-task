import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserCreateDto, IUserSearchDto, IUserUpdateDto } from '../../interfaces/user.interfaces';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../utils/controllerUtils';
import { IAccessTokenPayload } from '../../interfaces/auth.interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('create')
  async createUser(@Body() userCreate: IUserCreateDto) {
    return await this.userService.createUser(userCreate);
  }

  @Get('my')
  @UseGuards(AuthGuard)
  async myUser(@CurrentUser() { id }: IAccessTokenPayload) {
    return await this.userService.getLightUserById(id);
  }

  @Post('update')
  @UseGuards(AuthGuard)
  async updateUser(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Body() update: IUserUpdateDto,
  ) {
    return await this.userService.update(id, update);
  }

  @Post('search')
  @UseGuards(AuthGuard)
  async searchUser(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Body() search: IUserSearchDto,
  ) {
    await new Promise(r => setTimeout(r, 2000));

    return await this.userService.search(id, search.term);
  }
}
