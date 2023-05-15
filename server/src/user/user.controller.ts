import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Post('verify-email')
    async verifyEmail(@Body('verificationToken') verificationToken: string) {
        return this.userService.markAsVerified(verificationToken);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }
}
