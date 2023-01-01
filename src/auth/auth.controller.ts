import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { LoginUserDto } from "src/user/dto/LoginUserDto";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {

    private readonly Logger = new Logger(AuthController.name)
    constructor(
        private authService: AuthService
    ) { }

    @Post('register')
    public async register(@Body() body: CreateUserDto) {
        await this.authService.register(body)
    }

    @Post('login')
    public async login(@Body() body: LoginUserDto) {
        return this.authService.login(body)
    }

    @Get("check")
    check() {
        this.Logger.log("Running controller ")
    }
}