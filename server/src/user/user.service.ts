import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUserDto';
import { MailService } from './mail.service';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUserDto';
import { ValidationError, validate, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private mailService: MailService,
        private readonly jwtService: JwtService,
    ) { }

    async register(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {

        const info: CreateUserDto = plainToClass(CreateUserDto, createUserDto);
        const errors: ValidationError[] = await validate(info);

        if (errors.length > 0) {
            const errorMessage = errors.map((error) => Object.values(error.constraints)).join(', ');
            throw new BadRequestException(errorMessage);
        }

        const salt: string = await bcrypt.genSalt();
        const hashedPassword: string = await bcrypt.hash(createUserDto.password, salt);

        const createdUser = new this.userModel({
            email: createUserDto.email,
            password: hashedPassword,
            name: createUserDto.name
        });

        const verificationToken: string = this.generateVerificationToken();
        createdUser.verificationToken = verificationToken;
        await createdUser.save();

        const verificationLink: string = `http://${process.env.DOMEN_FRONT}/user/verifyEmail?token=${verificationToken}`;
        await this.mailService.sendVerificationEmail(createUserDto.email, verificationLink);

        const accessToken: string = this.jwtService.sign({ email: createUserDto.email, name: createUserDto.name, verified: false, token: verificationToken }, { expiresIn: '1h' });
        return { accessToken };
    }

    async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {

        const info: LoginUserDto = plainToClass(LoginUserDto, loginUserDto);
        const errors: ValidationError[] = await validate(info);

        if (errors.length > 0) {
            const errorMessage = errors.map((error) => Object.values(error.constraints)).join(', ');
            throw new BadRequestException(errorMessage);
        }

        const user: User = await this.userModel.findOne({ email: loginUserDto.email });
        if (!user) {
            throw new UnauthorizedException('This email is not registered');
        }

        const isPasswordValid: boolean = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('You entered the wrong password');
        }

        const accessToken: string = this.jwtService.sign({ email: user.email, name: user.name, verified: user.isVerified, token: user.verificationToken }, { expiresIn: '1h' });
        return { accessToken };
    }


    async refreshUserToken(token: string): Promise<{ token: string }> {
        try {
            await this.jwtService.verifyAsync(token);
            const decodedToken: any = this.jwtService.decode(token);
            delete decodedToken.exp;
            const accessToken: string = this.jwtService.sign(decodedToken, { expiresIn: '1h' });
            return { token: accessToken };
        } catch (error) {
            console.log(error)
            return { token: '' }
        }
    }

    private generateVerificationToken(): string {
        const token: string = randomBytes(32).toString('hex');
        return token;
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }

    async findUserByUsername(name: string): Promise<User | null> {
        return await this.userModel.findOne({ name });
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
