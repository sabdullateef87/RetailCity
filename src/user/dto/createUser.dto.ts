import Joi from "joi"

export class CreateUserDto {
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string

}

export const CreateUserSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
    
}).options({
    abortEarly: false
})