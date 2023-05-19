import { IsEmail, IsNotEmpty, Length } from 'class-validator';


export class CreateVideoDto {
    @IsNotEmpty({ message: 'name is required' })
    @Length(4, 15, { message: 'Name must be between 4 and 15 characters' })
    name: string;

    @IsNotEmpty({ message: 'description is required' })
    @Length(15, 200, { message: 'Name must be between 15 and 200 characters' })
    description: string;

    @IsNotEmpty({ message: 'user is required' })
    user: string;
}
