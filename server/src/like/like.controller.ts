import { Controller, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
    constructor(
        private readonly likeService: LikeService,
    ) { }


    @Post('/:idVideo/:idUser')
    async create(@Param('idVideo') idVideo: string, @Param('idUser') idUser: string) {
        return this.likeService.changeLike(idVideo, idUser)
    }
}
