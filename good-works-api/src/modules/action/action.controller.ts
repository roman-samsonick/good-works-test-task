import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../utils/controllerUtils';
import { IAccessTokenPayload } from '../../interfaces/auth.interfaces';
import { ICreateActionDto, IUpdateActionDto } from '../../interfaces/action.interfaces';
import { ActionService } from './action.service';

@Controller('action')
export class ActionController {
  constructor(
    private readonly actionService: ActionService,
  ) {
  }

  @Get('my')
  @UseGuards(AuthGuard)
  async getActions(
    @CurrentUser() { id }: IAccessTokenPayload,
  ) {
    return await this.actionService.getUserActions(id);
  }

  @Get('friend/:friendId')
  @UseGuards(AuthGuard)
  async getFriendActions(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Param('friendId', new ParseIntPipe()) friendId: number,
  ) {
    return await this.actionService.getFriendActions(id, friendId);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createAction(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Body() createAction: ICreateActionDto,
  ) {
    return await this.actionService.create(id, createAction);
  }

  @Post('update/:actionId')
  @UseGuards(AuthGuard)
  async updateAction(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Body() createAction: IUpdateActionDto,
    @Param('actionId', new ParseIntPipe()) actionId: number,
  ) {
    return await this.actionService.update(id, actionId, createAction);
  }

  @Post('remove/:actionId')
  @UseGuards(AuthGuard)
  async removeAction(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Param('actionId', new ParseIntPipe()) actionId: number,
  ) {
    await this.actionService.remove(id, actionId);

    return {};
  }
}
