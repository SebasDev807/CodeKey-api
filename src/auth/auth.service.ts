import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { MailerService } from '../mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';




@Injectable()
export class AuthService {

  private readonly logger = new Logger('authService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailerService,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {

    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
      select: { confirmed: true, id: true }
    });

    if (existingUser) {
      if (existingUser.confirmed) {
        throw new BadRequestException('This account already exists');
      }

      if (!existingUser.confirmed) {
        await this.userRepository.delete({ id: existingUser.id });
      }
    }

    const user = await this.userRepository.create(createUserDto);
    user.token = this.generateToken();
    const { name, token } = user;

    await this.userRepository.save(user);

    this.mailService.sendEmail(email, name, token, 'Verificación de cuenta', 'Verifica tu cuenta');

    delete user.password;

    return user;


  }


  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, confirmed: true, id:true }
    });

    if (!user) {
      throw new UnauthorizedException(`No existe una cuenta con el email ${email}`);
    }

    if (!user.confirmed) {
      throw new UnauthorizedException('Por favor confirma tu cuenta');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    delete user.password;

    console.log(user);
    
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }


  async confirmAccount(token: string) {

    const user = await this.userRepository.findOneBy({ token });

    if (!user) {
      throw new NotFoundException('El token no existe o ha expirado');
    }

    user.confirmed = true;
    user.token = null;
    await this.userRepository.save(user);

    return { message: 'Cuenta verificada!' };


  }


  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private generateToken() {
    return randomBytes(10).toString('hex');
  }

  private handleErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Verifica los logs del servidor');
  }


}
