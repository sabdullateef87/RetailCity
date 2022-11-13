import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [User, TypeOrmModule.forFeature([User])],
    exports: [],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
