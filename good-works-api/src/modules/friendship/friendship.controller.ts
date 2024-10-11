import { Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../utils/controllerUtils';
import { IAccessTokenPayload } from '../../interfaces/auth.interfaces';

@Controller('friendship')
@UseGuards(AuthGuard)
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {
  }

  @Post('invite/:to')
  async inviteFriendship(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Param('to', new ParseIntPipe()) to: number,
  ) {
    return await this.friendshipService.invite(id, to);
  }

  @Post('cancel/:friendshipId')
  async cancelFriendship(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Param('friendshipId', new ParseIntPipe()) friendshipId: number,
  ) {
    await this.friendshipService.cancel(friendshipId, id);

    return {};
  }

  @Post('accept/:friendshipId')
  async acceptFriendship(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Param('friendshipId', new ParseIntPipe()) friendshipId: number,
  ) {
    return await this.friendshipService.accept(friendshipId, id);
  }

  @Post('reject/:friendshipId')
  async rejectFriendship(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Param('friendshipId', new ParseIntPipe()) friendshipId: number,
  ) {
    await this.friendshipService.reject(friendshipId, id);

    return {};
  }

  @Post('remove/:friendshipId')
  async removeFriendship(
    @CurrentUser() { id }: IAccessTokenPayload,
    @Param('friendshipId', new ParseIntPipe()) friendshipId: number,
  ) {
    await this.friendshipService.remove(friendshipId, id);

    return {};
  }

  @Get('my')
  async getFriendships(
    @CurrentUser() { id }: IAccessTokenPayload,
  ) {
    return await this.friendshipService.getFriendshipsOf(id);
  }
}
