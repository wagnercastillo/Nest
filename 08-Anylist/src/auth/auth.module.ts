import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [ JwtStrategy, PassportModule, JwtModule ],
  imports: [

    ConfigModule,

    PassportModule.register( { defaultStrategy: 'jwt'}),
    
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '4h'
          }
        }
      }
    }),
    UsersModule,
  ]
})
export class AuthModule {}
