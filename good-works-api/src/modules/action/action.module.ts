import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from '../../models/action.model';
import { FriendshipModule } from '../friendship/friendship.module';

@Module({
  imports: [
    FriendshipModule,
    TypeOrmModule.forFeature([Action]),
  ],
  providers: [ActionService],
  controllers: [ActionController],
  exports: [ActionService],
})
export class ActionModule {
}
