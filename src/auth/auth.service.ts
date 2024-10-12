import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { MailerService } from '../mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('authService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailerService
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
