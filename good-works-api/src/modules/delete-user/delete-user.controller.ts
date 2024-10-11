import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../utils/controllerUtils';
import { IAccessTokenPayload } from '../../interfaces/auth.interfaces';
import { UserService } from '../user/user.service';
import { FriendshipService } from '../friendship/friendship.service';
import { ActionService } from '../action/action.service';

@Controller()
export class DeleteUserController {
  constructor(
    private readonly userService: UserService,
    private readonly friendshipService: FriendshipService,
    private readonly actionsService: ActionService,
  ) {
  }

  @Post('user/remove')
  @UseGuards(AuthGuard)
  async removeUser(
    @CurrentUser() { id }: IAccessTokenPayload,
  ) {
    await this.userService.remove(id);
    await this.friendshipService.removeAllFriendshipsOfUser(id);
    await this.actionsService.removeAllActionsOfUser(id);

    return {};
  }
}
