import { BadRequestException, Body, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable({})
export class AuthService {

    private readonly Logger = new Logger(AuthService.name)

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    public async register(body: CreateUserDto) {
        const { password } = body;

        try {
            await this.validateRequest(body);

            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_SALT))
            await this.userRepo.save({ ...body, password: hashedPassword });
            return body;
        } catch (error) {

            throw new BadRequestException('Something bad happened', { cause: new Error(), description: `${error}` })
        }
    }

    private async validateRequest(body: CreateUserDto): Promise<boolean> {
        let isValid = false
        const email = body.email
        const user = await this.userRepo.findOneBy({ email });
        if (user) {
            throw new HttpException("User already exist !", HttpStatus.BAD_REQUEST)
        }
        else if (body.password !== body.confirmPassword) {
            throw new HttpException("Password do not match", HttpStatus.BAD_REQUEST)
        } else {
            isValid = true
        }
        return isValid;
    }
}