import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionModule } from './modules/action/action.module';
import { UserModule } from './modules/user/user.module';
import { FriendshipModule } from './modules/friendship/friendship.module';
import { AuthModule } from './modules/auth/auth.module';
import { GenerateModule } from './modules/generate/generate.module';
import { DeleteUserModule } from './modules/delete-user/delete-user.module';

@Module({
  imports: [
    ActionModule,
    UserModule,
    FriendshipModule,
    AuthModule,
    GenerateModule,
    DeleteUserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NODE_ENV === 'development'
        ? 'localhost'
        : 'postgres',
      port: 5432,
      database: 'database',
      password: 'password',
      username: 'user',
      synchronize: true,
      logging: false,
      retryAttempts: 100000,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {
}

