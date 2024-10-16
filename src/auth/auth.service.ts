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

    try {

      const user = await this.userRepository.create(createUserDto);
      user.token = this.generateToken();
      const { email, name, token } = user;

      await this.userRepository.save(user);

      this.mailService.sendEmail(email, name, token, 'Verificación de cuenta', 'Verifica tu cuenta');

      delete user.password;

      return user;

    } catch (error) {
      this.logger.error(error);
      this.handleErrors(error);
    }
  }


  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true }
    });

    if (!user) {
      throw new UnauthorizedException(`Not account related with email ${email}`);
    }

    if (user.confirmed) {
      throw new UnauthorizedException('Please, confirm your account');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    delete user.password;

    return {
      user,
      token: this.getJwtToken({ id: user.id })
    };
  }


  async confirmAccount(token: string) {

    const user = await this.userRepository.findOneBy({ token });

    if (!user) {
      throw new NotFoundException('Invalid token or has expired');
    }

    user.confirmed = true;
    user.token = null;
    await this.userRepository.save(user);

    return { message: 'Account verified!' };


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
    throw new InternalServerErrorException('Please check server logs');
  }


}
