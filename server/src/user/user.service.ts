import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUserDto';
import { MailService } from './mail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private mailService: MailService,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const createdUser = new this.userModel({
            email: createUserDto.email,
            password: hashedPassword,
            name: createUserDto.name
        });

        const verificationToken = this.generateVerificationToken();
        createdUser.verificationToken = verificationToken;
        await createdUser.save();

        // Send verification email
        const verificationLink = `http://127.0.0.1:5000/verify-email?token=${verificationToken}`;
        await this.mailService.sendVerificationEmail(createUserDto.email, verificationLink);

        return createdUser.save();
    }

    private generateVerificationToken(): string {
        const token = randomBytes(32).toString('hex');
        return token;
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    async markAsVerified(verificationToken: string): Promise<User> {
        const user = await this.userModel.findOneAndUpdate(
            { verificationToken },
            { isVerified: true, verificationToken: undefined },
            { new: true }
        )

        return user;
    }
}
