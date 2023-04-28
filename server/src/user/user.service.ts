import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const createdUser = new this.userModel({
            email: createUserDto.email,
            password: hashedPassword,
            name: createUserDto.name,
            role: createUserDto.role,
        });

        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }
}
