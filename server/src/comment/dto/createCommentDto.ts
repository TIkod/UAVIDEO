import { IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({ message: 'text is required' })
    @Length(4, 250, { message: 'Name must be between 4 and 250 characters' })
    readonly text: string;

    @IsNotEmpty({ message: 'user is required' })
    readonly userId: string;

    @IsNotEmpty({ message: 'video is required' })
    readonly videoId: string;
}