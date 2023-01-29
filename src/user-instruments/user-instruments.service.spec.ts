import { UserInstrumentsService } from './user-instruments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserInstrumentsService', () => {
  let service: UserInstrumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInstrumentsService],
    }).compile();

    service = module.get<UserInstrumentsService>(UserInstrumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
