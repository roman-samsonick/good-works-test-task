import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [
    HashModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
}
