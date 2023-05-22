import { Controller, Param, Post } from '@nestjs/common';
import { ViewService } from './view.service';

@Controller('view')
export class ViewController {
    constructor(
        private readonly viewService: ViewService,
    ) { }


    @Post('/:idVideo/:idUser')
    async create(@Param('idVideo') idVideo: string, @Param('idUser') idUser: string) {
        return this.viewService.upView(idVideo, idUser)
    }
}
