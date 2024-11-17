import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

// TODO: Esta implementación con Nodemailer es temporal.
// En el futuro, se actualizará para seguir los estándares de NestJS
// utilizando un módulo de Mailer más robusto, posiblemente con microservicios
// para mayor escalabilidad y mantenibilidad.

@Injectable()
export class MailerService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendEmail(
    email: string,
    name: string,
    token: string,
    subject: string,
    text: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: 'codekey@support.com',
        to: email,
        subject,
        text,
        html: this.confirmAccountHTML(name, token),
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private confirmAccountHTML(name: string, token: string) {
    const firstName = name.split(' ')[0];

    return `
            <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
                <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <div style="background-color: #5c4d8e; color: #ffffff; padding: 20px; text-align: center;">
                        <h1>Hola ${firstName} ¡Bienvenido a CodeKey!</h1>
                    </div>
                    <div style="padding: 20px;">
                        <h2>Confirma tu Cuenta</h2>
                        <p>Para completar tu registro, por favor confirma tu cuenta haciendo clic en el botón de abajo:</p>
                        <a href="http://localhost:3000/api/v1/auth/verify/${token}" style="display: inline-block; padding: 15px 25px; margin: 20px 0; color: #ffffff; background-color: #8a6bb1; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">Confirmar Cuenta</a>
                        <p>Si no solicitaste esta cuenta, puedes ignorar este correo.</p>
                    </div>
                    <div style="padding: 10px; text-align: center; font-size: 14px; color: #888888;">
                        <p>&copy; ${new Date().getFullYear()} CodeKey. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        `;
  }
}
