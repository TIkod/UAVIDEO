import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginUserDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    readonly email: string;

    @IsNotEmpty({ message: 'Passowrd is required' })
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    readonly password: string;
}