import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ActionModule } from '../action/action.module';
import { FriendshipModule } from '../friendship/friendship.module';
import { GenerateService } from './generate.service';

@Module({
  imports: [
    UserModule,
    ActionModule,
    FriendshipModule,
  ],
  providers: [GenerateService]
})
export class GenerateModule {}
