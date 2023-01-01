import { Equals, IsNotEmpty } from "class-validator"
import Joi from "joi"

export class LoginUserDto {
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

}

// export const CreateUserSchema = Joi.object({
//     firstname: Joi.string().required(),
//     lastname: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     confirmPassword: Joi.string().required()

// }).options({
//     abortEarly: false
// })