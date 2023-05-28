import { BadRequestException, Injectable, ValidationError } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/createCommentDto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel('Comment') private readonly commentModel: Model<Comment>,
    ) { }

    async addComement(comment: CreateCommentDto): Promise<Comment> {
        const info: CreateCommentDto = plainToClass(CreateCommentDto, comment);
        const errors: ValidationError[] = await validate(info);

        if (errors.length > 0) {
            const errorMessage = errors.map((error) => Object.values(error.constraints)).join(', ');
            throw new BadRequestException(errorMessage);
        }

        try {
            console.log(comment);
            const createdComment: Comment = await this.commentModel.create({ text: comment.text, video: comment.videoId, author: comment.userId });
            return createdComment;
        } catch (err) {
            throw new BadRequestException("Not correct data");
        }
    }

    async getComments(videoId: string, offset: number = 0, count: number = 5): Promise<Comment[]> {
        const comments: Comment[] = await this.commentModel
            .find({ video: videoId })
            .skip(Number(offset))
            .limit(Number(count))
            .populate('author', 'name email');
        return comments;
    }
}
