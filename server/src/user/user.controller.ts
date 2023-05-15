import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { LoginUserDto } from './dto/loginUserDto';

@Controller('user')
export class UsersController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('register')
    async create(@Body() dto: CreateUserDto) {
        return this.userService.register(dto);
    }

    @Post('verify-email')
    async verifyEmail(@Body('verificationToken') verificationToken: string) {
        return this.userService.markAsVerified(verificationToken);
    }

    @Post('login')
    async login(@Body() dto: LoginUserDto) {
        return this.userService.login(dto);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }
}
