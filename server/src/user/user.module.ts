import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { MailService } from './mail.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'your-secret-key',
            signOptions: { expiresIn: '1d' },
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema },

        ])],
    controllers: [UsersController],
    providers: [UserService, MailService, JwtStrategy],
    exports: [PassportModule, JwtStrategy]
})

export class UsersModule { }