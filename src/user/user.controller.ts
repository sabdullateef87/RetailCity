import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { CreateUserValidatorPipe } from "./pipes/validation.pipe";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post()
    @UsePipes(new CreateUserValidatorPipe())
    public async create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
        
        return null;
    }

    private validateCreateUserparams(user: CreateUserDto): boolean {
        let isValid: boolean = false;

        return isValid;
    }
}