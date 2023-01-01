import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth.strategy/local.strategy';
import { JwtStrategy } from './auth.strategy/jwt.strategy';

@Module({
    imports: [
        User,
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: { expiresIn: '3600s' },
        }),],
    exports: [],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
