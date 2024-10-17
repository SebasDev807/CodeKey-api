import { Test, TestingModule } from '@nestjs/testing';
import { PregressChallengeService } from './pregress-challenge.service';

describe('PregressChallengeService', () => {
  let service: PregressChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PregressChallengeService],
    }).compile();

    service = module.get<PregressChallengeService>(PregressChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
