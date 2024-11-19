import { Test, TestingModule } from '@nestjs/testing';
import { CheckAnswerService } from './check-answer.service';

describe('CheckAnswerService', () => {
  let service: CheckAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckAnswerService],
    }).compile();

    service = module.get<CheckAnswerService>(CheckAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
