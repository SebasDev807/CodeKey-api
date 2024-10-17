import { Test, TestingModule } from '@nestjs/testing';
import { PregressChallengeController } from './pregress-challenge.controller';
import { PregressChallengeService } from './pregress-challenge.service';

describe('PregressChallengeController', () => {
  let controller: PregressChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PregressChallengeController],
      providers: [PregressChallengeService],
    }).compile();

    controller = module.get<PregressChallengeController>(PregressChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
