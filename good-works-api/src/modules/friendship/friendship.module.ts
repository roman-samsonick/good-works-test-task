import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friendship } from '../../models/friendship.model';
import { FriendshipController } from './friendship.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [FriendshipService],
  exports: [FriendshipService],
  controllers: [FriendshipController],
  imports: [TypeOrmModule.forFeature([Friendship]), UserModule],
})
export class FriendshipModule {
}
