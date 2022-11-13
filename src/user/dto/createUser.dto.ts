import { Equals, IsNotEmpty } from "class-validator"
import Joi from "joi"

export class CreateUserDto {

    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    confirmPassword: string

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