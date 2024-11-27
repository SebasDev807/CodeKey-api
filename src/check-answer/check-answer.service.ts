import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AnswerSubmitDto } from './dto/check-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/challenge/entities/challenge.entity';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { ChallengeService } from '../challenge/challenge.service';


@Injectable()
export class CheckAnswerService {

  private readonly logger = new Logger('CheckAnswerService')
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,

    private readonly challengeService: ChallengeService
  ) { }

  async compare(answerSubmitDto: AnswerSubmitDto, challengeId: number) {

    const { charOrder } = answerSubmitDto;

    const queryBuilder = this.challengeRepository.createQueryBuilder('chall');

    try {

      const challenge = await queryBuilder
        .where('chall.id =:challengeId', {
          challengeId
        })
        .leftJoinAndSelect('chall.challengeOptions', 'options')
        .getOne();

      const { challengeOptions } = challenge;

      const option = challengeOptions.find(option => option.charOrder === charOrder);

      if (option.correct) {

        return {
          option,
          correct: true,
          message: 'Respuesta correcta!'
        }

      } else {

        return {
          option,
          correct: false,
          message: 'Respuesta incorrecta.'

        }

      }


    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Something went broke.')
    }
  }


  async compileCode(code: string, idChallenge: number,): Promise<string> {
    const codeToExecute = code;

    // Usar `exec` con un timeout para evitar ciclos infinitos
    return new Promise((resolve: any, reject) => {
      exec(
        `node -e "${codeToExecute.replace(/"/g, '\\"')}"`,
        { timeout: 500 }, // Establecer un timeout 3 segundos
        (error, stdout, stderr) => {
          if (error || stderr) {
            // Verificar si el error es un ReferenceError

            if (stderr && stderr.includes('ReferenceError')) {
              this.logger.error(`ReferenceError: ${stderr}`);
              return reject(new BadRequestException(`ReferenceError: ${stderr}`));
            }


            // Para cualquier otro tipo de error, devolver un mensaje genérico
            this.logger.error(`Error al ejecutar el código: ${stderr || error.message}`);
            return reject(new BadRequestException(`${stderr}`));
          }


          resolve(this.compareCode(stdout, idChallenge));
        }
      );
    });
  }

  private async compareCode(output: string, idChallenge: number) {
   
    const challenge = await this.challengeService.getChallengeCode(idChallenge);

    const sanitizedOutput = output.trim();
    const sanitizedExpectedOutput = challenge.expectedOutput.trim();

    if (sanitizedOutput === sanitizedExpectedOutput) {
      return {
        output: sanitizedOutput,
        correct: true,
        message: 'Salida correcta!',
        expectedOutput: sanitizedExpectedOutput
      };
    } else {
      return {
        output: sanitizedOutput,
        correct: false,
        message: 'Salida incorrecta.',
        expectedOutput: sanitizedExpectedOutput
      };
    }
  }
}