import { Test, TestingModule } from '@nestjs/testing';
import { OptionChallengeController } from './option-challenge.controller';
import { OptionChallengeService } from './option-challenge.service';

describe('OptionChallengeController', () => {
  let controller: OptionChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionChallengeController],
      providers: [OptionChallengeService],
    }).compile();

    controller = module.get<OptionChallengeController>(OptionChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
