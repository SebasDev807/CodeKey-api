import { Test, TestingModule } from '@nestjs/testing';
import { OptionChallengeService } from './option-challenge.service';

describe('OptionChallengeService', () => {
  let service: OptionChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionChallengeService],
    }).compile();

    service = module.get<OptionChallengeService>(OptionChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
