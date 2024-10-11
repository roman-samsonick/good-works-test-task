import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ActionModule } from '../action/action.module';
import { FriendshipModule } from '../friendship/friendship.module';
import { DeleteUserController } from './delete-user.controller';

@Module({
  imports: [
    UserModule,
    ActionModule,
    FriendshipModule,
  ],
  controllers: [DeleteUserController]
})
export class DeleteUserModule {}
