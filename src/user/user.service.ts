import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from "crypto";
import { validate as isUUID } from 'uuid';
import { MailerService } from 'src/mailer/mailer.service';


@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService
  ) { }

  async createUser(createUserDto: CreateUserDto) {

    try {
      const user = await this.userRepository.create(createUserDto);
      user.token = this.generateToken();
      const { email, name, token } = user;
      await this.userRepository.save(user);
      this.mailerService.sendEmail(email,name, token, 'Verificación de cuenta', 'Tu cuenta ha sido confirmada');

      return user;

    } catch (error) {

      this.handleDbExceptions(error);
      this.logger.error(error);

    }

  }

  async confirmUser(token: string) {

    const user = await this.findOne(token);
    user.token = null;
    user.confirmed = true;
    await this.userRepository.save(user)
    return { message: 'Account confirmed!' }

  }


  async findOne(term: string) {

    let user: User;

    try {

      if (isUUID(term)) {
        user = await this.userRepository.findOneBy({ id: term });
      } else {
        const queryBuilder = this.userRepository.createQueryBuilder();
        user = await queryBuilder
          .where('UPPER(name) =:name OR token=:token', {
            name: term.toUpperCase(),
            token: term
          }).getOne();
      }

      if (!user) {
        throw new NotFoundException(`User not found`)
      }

      return user;

    } catch (error) {
      this.logger.error(error)
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  private generateToken() {
    return randomBytes(10).toString('hex');
  }

  private handleDbExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Oops! something went broke');
  }
}
