import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
    private resend: Resend;

    constructor(private configService: ConfigService) {
        console.log('Gay');
        this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
    }

    async sendEmail(email: string, name: string, token: string, subject: string, text: string): Promise<void> {

        console.log('Hey');
        try {
            await this.resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject,
                html: this.confirmAccountHTML(name, token),
                text,
            });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error enviando el correo', error.message);
        }
    }

    private confirmAccountHTML(name: string, token: string): string {
        const firstName = name.split(' ')[0];

        return `
     <div style="font-family: Arial, sans-serif; background-color: #000000; margin: 0; padding: 0;">
    <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #000000; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #9b4dca; color: #ffffff; padding: 20px; text-align: center;">
            <h1>Hola ${firstName} ¡Bienvenido a CodeKey!</h1>
        </div>
        <div style="padding: 20px;">
            <h2 style="color: #ffffff;">Confirma tu Cuenta</h2>
            <p style="color: #ffffff;">Para completar tu registro, por favor confirma tu cuenta haciendo clic en el botón de abajo:</p>
            <a href="http://localhost:3000/api/v1/auth/verify/${token}" style="display: inline-block; padding: 15px 25px; margin: 20px 0; color: #ffffff; background-color: #9b4dca; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">Confirmar Cuenta</a>
            <p style="color: #ffffff;">Si no solicitaste esta cuenta, puedes ignorar este correo.</p>
        </div>
        <div style="padding: 10px; text-align: center; font-size: 14px; color: #888888;">
            <p>&copy; ${new Date().getFullYear()} CodeKey. Todos los derechos reservados.</p>
        </div>
    </div>
</div>

    `;
    }
}
