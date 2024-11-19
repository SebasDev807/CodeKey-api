import { Test, TestingModule } from '@nestjs/testing';
import { CheckAnswerController } from './check-answer.controller';
import { CheckAnswerService } from './check-answer.service';

describe('CheckAnswerController', () => {
  let controller: CheckAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckAnswerController],
      providers: [CheckAnswerService],
    }).compile();

    controller = module.get<CheckAnswerController>(CheckAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
