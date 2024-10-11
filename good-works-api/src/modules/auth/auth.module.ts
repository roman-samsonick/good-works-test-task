import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashModule } from '../hash/hash.module';
import { AuthGuard } from './auth.guard';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  exports: [AuthService, AuthGuard],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    UserModule,
    HashModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
})
export class AuthModule {
}
