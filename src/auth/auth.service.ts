import { BadRequestException, Body, HttpException, HttpStatus, Injectable, Logger, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "src/user/dto/LoginUserDto";
import { AuthGuard } from "@nestjs/passport";

@Injectable({})
export class AuthService {

    private readonly Logger = new Logger(AuthService.name)

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService
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

    @UseGuards(AuthGuard('local'))
    public async login(data: LoginUserDto) {

        const user = await this.getAuthUser(data.email, data.password);
        if (user === null) {
            throw new HttpException("User does not exist or password is incorrect !", HttpStatus.NOT_FOUND)
        }
        const payload = { email: user.email, id: user.user_id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    private async emailVerification() {

    }
    private async validateRequest(body: CreateUserDto): Promise<boolean> {
        let isValid = false
        const email = body.email
        const user = await this.userRepo.findOneBy({ email });
        if (user) {
            throw new HttpException("User already exist !", HttpStatus.BAD_REQUEST)
        }
        else if (body.password !== body.confirmPassword) {
            throw new HttpException("Passwords do not match", HttpStatus.BAD_REQUEST)
        } else {
            isValid = true
        }
        return isValid;
    }

    private async verifyPassword(plainPassword: string, hashedPassword: string) {

        const isPasswordMatching = await bcrypt.compare(plainPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
        }

    }

    public async getAuthUser(email: string, password: string): Promise<User> {
        try {
            const user = await this.userRepo.findOneBy({ email });
            await this.verifyPassword(password, user?.password)
            return user
        } catch (err) {
            throw new HttpException("Wrong credentials !", HttpStatus.BAD_REQUEST);
        }

    }




}