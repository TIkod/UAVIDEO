import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = createTransport({
            host: this.configService.get('MAIL_HOST'),
            port: this.configService.get('MAIL_PORT'),
            secure: true,
            auth: {
                user: this.configService.get('MAIL_USERNAME'),
                pass: this.configService.get('MAIL_PASSWORD'),
            },
        });
    }

    async sendVerificationEmail(email: string, verificationLink: string): Promise<void> {
        const mailOptions = {
            from: this.configService.get('MAIL_SENDER'),
            to: email,
            subject: 'Підтвердження адреси електронної пошти',
            text: `Будь ласка, перейдіть за посиланням, щоб підтвердити свою адресу електронної пошти: ${verificationLink}`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
