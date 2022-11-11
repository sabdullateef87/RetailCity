import { PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { CreateUserDto, CreateUserSchema } from '../dto/createUser.dto';

export class ValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return value;
    }
}

export class CreateUserValidatorPipe implements PipeTransform<CreateUserDto> {
    public transform(value: CreateUserDto): CreateUserDto {
        const result = CreateUserSchema.validate(value);
        if (result.error) {
            const errorMessages = result.error.details.map((d) => d.message).join();
            throw new BadRequestException(errorMessages);
        }
        return value;
    }
}