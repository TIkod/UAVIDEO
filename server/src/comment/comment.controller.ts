import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';

@Controller('comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
    ) { }


    @Post('/')
    async create(@Body() dto: CreateCommentDto) {
        return this.commentService.addComement(dto);
    }

    @Get('/:idVideo')
    async getAll(@Param('idVideo') idVideo: string) {
        return this.commentService.getComments(idVideo);
    }
}
