import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    exports:[],
    providers:[UserService],
    controllers:[UserController]
})
export class UserModule {}
