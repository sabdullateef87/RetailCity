import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    public async create(user: CreateUserDto) {

    }

    public async getUser() {

    }
    public async updateUserProfile() {

    }
    public async suspendUser() {
        
    }

    private buildUserFromDto(user: CreateUserDto): User {
        let userInstance = new User();
        userInstance.email = user.email
        userInstance.firstname = user.firstname
        userInstance.password = user.password

        return userInstance
    }

    
}

