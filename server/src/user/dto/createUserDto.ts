import { BadRequestException } from '@nestjs/common';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'name is required' })
    @Length(4, 15, { message: 'Name must be between 4 and 15 characters' })
    readonly name: string;

    @IsEmail({}, { message: 'Invalid email format' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    readonly password: string;

    readonly role?;
}