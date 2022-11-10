import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    public async create(){

    }

    public async getUser(){

    }
    public async updateUserProfile(){

    }
    public async suspendUser(){
        
    }
}

